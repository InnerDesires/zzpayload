import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
import localization from './locatization';
 
export const routing = defineRouting({
    locales: localization.locales.map((locale) => locale.code),
    defaultLocale: localization.defaultLocale,
  })
  
 
// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);