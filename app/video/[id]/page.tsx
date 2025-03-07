import Link from "next/link"
import Image from "next/image"
import { ThumbsUp, ThumbsDown, Share, Save, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import VideoPlayer from "@/components/video-player"

interface VideoPageProps {
  params: {
    id: string
  }
}

export default function VideoPage({ params }: VideoPageProps) {
  const { id } = params

  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 max-w-7xl mx-auto">
      <div className="flex-1">
        <VideoPlayer videoId={id} />

        <div className="mt-4">
          <h1 className="text-2xl font-bold">Decentralized Web 3.0 Explained - The Future of the Internet</h1>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?height=40&width=40&text=C1" alt="Channel" width={40} height={40} />
                </div>
                <div>
                  <Link href="/channel" className="font-medium hover:text-primary">
                    Crypto Academy
                  </Link>
                  <div className="text-sm text-muted-foreground">250K subscribers</div>
                </div>
              </div>

              <Button className="ml-4">Subscribe</Button>
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center border rounded-full overflow-hidden">
                <Button variant="ghost" size="sm" className="rounded-none rounded-l-full">
                  <ThumbsUp className="mr-1 h-4 w-4" />
                  12K
                </Button>
                <div className="h-5 border-r"></div>
                <Button variant="ghost" size="sm" className="rounded-none rounded-r-full">
                  <ThumbsDown className="h-4 w-4" />
                </Button>
              </div>

              <Button variant="ghost" size="sm">
                <Share className="mr-1 h-4 w-4" />
                Share
              </Button>

              <Button variant="ghost" size="sm">
                <Save className="mr-1 h-4 w-4" />
                Save
              </Button>

              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-6 p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-muted-foreground">1.2M views • 2 months ago</div>
            </div>
            <p className="text-sm">
              In this video, we explore the concept of Web 3.0 and how decentralized technologies are reshaping the
              internet. Learn about blockchain, cryptocurrency, and how they enable new models for content creation and
              consumption.
            </p>
            <Button variant="link" className="text-sm p-0 h-auto mt-2">
              Show more
            </Button>
          </div>

          <div className="mt-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Comments • 843</h3>
              <Button variant="ghost" size="sm">
                Sort by
              </Button>
            </div>

            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image src="/placeholder.svg?height=40&width=40&text=You" alt="Your avatar" width={40} height={40} />
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full bg-transparent border-b focus:border-primary focus:outline-none py-2"
                />
              </div>
            </div>

            {/* Sample comments */}
            {[1, 2, 3].map((comment) => (
              <div key={comment} className="flex gap-4 mb-6">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <Image
                    src={`/placeholder.svg?height=40&width=40&text=U${comment}`}
                    alt="User avatar"
                    width={40}
                    height={40}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">User {comment}</span>
                    <span className="text-xs text-muted-foreground">{comment * 2} days ago</span>
                  </div>
                  <p className="mt-1 text-sm">
                    This is such an informative video! I've been trying to understand Web 3.0 for a while, and this
                    explanation really helped clarify things.
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment * 24}
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      <ThumbsDown className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 px-2">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full mt-2">
              Show more comments
            </Button>
          </div>
        </div>
      </div>

      <div className="md:w-80 lg:w-96">
        <h3 className="text-lg font-semibold mb-4">Up next</h3>
        <div className="space-y-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex gap-2">
              <Link href={`/video/video-${i + 20}`} className="flex-shrink-0 w-40">
                <div className="relative aspect-video rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=90&width=160&text=Video+${i + 20}`}
                    alt={`Video ${i + 20}`}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <div className="flex-1">
                <Link href={`/video/video-${i + 20}`} className="block">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {i % 2 === 0
                      ? "Cryptocurrency and the Future of Finance"
                      : "How Blockchain is Changing Content Creation"}
                  </h4>
                </Link>
                <Link href="/channel" className="block text-xs text-muted-foreground hover:text-foreground mt-1">
                  Creator {(i % 3) + 1}
                </Link>
                <div className="text-xs text-muted-foreground">
                  {Math.floor(Math.random() * 500) + 100}K views • {Math.floor(Math.random() * 11) + 1} months ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

