import { notFound } from 'next/navigation'
import portfolioData from '@/data/portfolio.json'
import WorkGallery from '@/components/WorkGallery'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return portfolioData.map((work) => ({ slug: work.slug }))
}

export default async function WorkPage({ params }: Props) {
  const { slug } = await params
  const work = portfolioData.find((w) => w.slug === slug)

  if (!work) notFound()

  return <WorkGallery work={work} />
}
