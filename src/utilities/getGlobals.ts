import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']
import { TypedLocale } from 'payload'

export async function getGlobal(slug: Global, locale: TypedLocale, depth = 0) {
  const payload = await getPayload({ config: configPromise })

  const global = await payload.findGlobal({
    slug,
    depth,
    locale: locale,
  })

  return global
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, locale: TypedLocale, depth = 0) =>
  unstable_cache(async () => getGlobal(slug, locale, depth), [slug], {
    revalidate: 60,
    tags: [`global_${slug}`],
  })
