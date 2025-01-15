import React from 'react'
import { NextIntlClientProvider } from 'next-intl'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'


export const Providers: React.FC<{
  children: React.ReactNode
  messages: any
}> = ({ children, messages }) => {

  return (
    <ThemeProvider>
      <NextIntlClientProvider messages={messages}>  
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </NextIntlClientProvider>
    </ThemeProvider>
  )
}
