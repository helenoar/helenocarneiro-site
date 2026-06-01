import portfolioData from '@/data/portfolio.json'
import PortfolioGrid from '@/components/PortfolioGrid'

export default function PortfolioPage() {
  return <PortfolioGrid works={portfolioData} />
}
