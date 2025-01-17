import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload, TypedLocale } from 'payload'
import { draftMode } from 'next/headers'
import React from 'react'
import { unstable_cache } from 'next/cache'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

// Cache the Payload instance
const getPayloadInstance = unstable_cache(
  async () => {
    return getPayload({ config: configPromise })
  },
  ['payload-instance'],
  { revalidate: 3600 } // Cache for 1 hour
)

// Cache the page query with proper cache key and revalidation
const queryPageBySlug = unstable_cache(
  async ({ slug, locale, draft }: { slug: string; locale: TypedLocale; draft: boolean }) => {
    const payload = await getPayloadInstance()

    const result = await payload.find({
      collection: 'pages',
      draft,
      limit: 1,
      pagination: false,
      locale,
      overrideAccess: draft,
      where: {
        slug: {
          equals: slug,
        },
      },
      // Only fetch the fields we need
      select: {
        id: true,
        slug: true,
        hero: true,
        layout: true,
        meta: true,
      },
    })

    return result.docs?.[0] || null
  },
  ['page-by-slug'],
  {
    tags: ['pages'],
    revalidate: 60, // Cache for 1 minute in production
  }
)

export async function generateStaticParams() {
  const payload = await getPayloadInstance()
  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    locale: TypedLocale
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', locale = 'uk' } = await paramsPromise

  const url = '/' + slug

  let page: PageType | null
  page = await queryPageBySlug({
    slug,
    locale,
    draft
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page

  return (
    <article className="pt-16 pb-24">
      <PageClient />
      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <RenderHero {...hero} />
      <RenderBlocks blocks={layout} locale={locale} />
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home', locale = 'uk' } = await paramsPromise
  
  const page = await queryPageBySlug({
    slug,
    locale,
    draft
  })

  return generateMeta({ doc: page })
}

