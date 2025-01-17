import PageTemplate, { generateMetadata } from './[slug]/page'


export const generateStaticParams = async () => {
  return ['uk', 'en'].map((locale) => ({ locale }))
}

export default PageTemplate

export { generateMetadata }
