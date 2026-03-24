import { getAllPosts } from '@/lib/posts'
import PortfolioClient from '@/components/PortfolioClient'

export default async function HomePage() {
  const latestPosts = await getAllPosts()
  return <PortfolioClient latestPosts={latestPosts} />
}
