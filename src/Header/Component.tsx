import { HeaderClient } from './Component.client'
import { getGlobal } from '@/utilities/getGlobals'
import React from 'react'
import { getLocale } from "next-intl/server";

import type { Header } from '@/payload-types'


export async function Header(params: any) {
  const locale = await getLocale();
  const headerData: Header = await getGlobal('header', locale as 'en' | 'uk', 1);
  return <HeaderClient data={headerData} />
}
