'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { SearchIcon } from 'lucide-react'
import LanguageSwitcher from './LanguageSwitcher'
import { Button } from '@/components/ui/button'

import { Link } from '@/i18n/routing'
import { useTranslations } from 'next-intl'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const t  = useTranslations('Nav')
  const navItems = data?.navItems || []
  return (
    <nav className="flex justify-between flex-1">
      <div className="flex gap-3 items-center">
        {navItems.map(({ link }, i) => {
          return <CMSLink key={i} {...link} appearance="link" />
        })}
      </div>
      <div className="flex gap-3 items-center">
        <Button asChild size="clear" variant="link" className="sm:block hidden">
            <Link href="/login">
                {t('login')}
            </Link>
        </Button>
        <Button asChild size="clear" variant="link">
            <Link href="/register">
                {t('register')}
            </Link>
        </Button>
        <LanguageSwitcher/>
      </div>
    </nav>
  )
}
