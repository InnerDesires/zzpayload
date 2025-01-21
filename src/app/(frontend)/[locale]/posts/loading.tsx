import { Skeleton } from "@/components/ui/skeleton"
import PageClient from "./page.client"
import { PageRange } from "@/components/PageRange"
import { useTranslations } from "next-intl"

export default function Loading() {
    const t = useTranslations('Posts')
  return (
    <div className="pt-24 pb-24">
    <PageClient />
    <div className="container mb-16">
      <div className="prose dark:prose-invert max-w-none">
        <h1>{t('title')}</h1>
      </div>
    </div>

    <div className="container mb-8">
      <PageRange
        collection="posts"
        currentPage={1}
        limit={12}
        totalDocs={1}
      />
    </div>
    <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-4">
            <Skeleton className="w-full h-[200px] rounded-lg" />
            <Skeleton className="w-3/4 h-4" />
            <Skeleton className="w-1/2 h-4" />
          </div>
        ))}
      </div>
  </div>
  )
}
