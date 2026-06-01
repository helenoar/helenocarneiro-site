import videosData from '@/data/videos.json'
import VideosList from '@/components/VideosList'

export default function VideosPage() {
  return <VideosList videos={videosData} />
}
