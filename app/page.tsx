import { getAllPosts } from '@/lib/posts'
import PortfolioClient from '@/components/PortfolioClient'

export default function HomePage() {
  const latestPosts = getAllPosts().slice(0, 5)
  return <PortfolioClient latestPosts={latestPosts} />
}
