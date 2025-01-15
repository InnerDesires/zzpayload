import { getRequestConfig } from 'next-intl/server'
import { routing } from './routing'

// Import all messages statically
import uk from './messages/uk.json'
import en from './messages/en.json'

type Messages = typeof uk

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages extends Messages {}
}

// Create a messages object map
const messages = {
  uk,
  en
} as const

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale
  }

  return {
    locale,
    messages: messages[locale as keyof typeof messages],
  }
})