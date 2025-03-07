import Link from "next/link"
import Image from "next/image"

interface VideoCardProps {
  id: string
  title: string
  channel: string
  views: string
  timestamp: string
  thumbnail: string
  avatar: string
}

export default function VideoCard({ id, title, channel, views, timestamp, thumbnail, avatar }: VideoCardProps) {
  return (
    <div className="group">
      <Link href={`/video/${id}`} className="block">
        <div className="relative aspect-video overflow-hidden rounded-lg mb-2">
          <Image
            src={thumbnail || "/placeholder.svg"}
            alt={title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
      </Link>
      <div className="flex gap-3">
        <Link href="/channel" className="flex-shrink-0">
          <div className="w-9 h-9 rounded-full overflow-hidden">
            <Image src={avatar || "/placeholder.svg"} alt={channel} width={36} height={36} className="object-cover" />
          </div>
        </Link>
        <div>
          <Link href={`/video/${id}`} className="block">
            <h3 className="font-medium line-clamp-2 group-hover:text-primary">{title}</h3>
          </Link>
          <Link href="/channel" className="block text-sm text-muted-foreground hover:text-foreground">
            {channel}
          </Link>
          <div className="text-xs text-muted-foreground">
            {views} • {timestamp}
          </div>
        </div>
      </div>
    </div>
  )
}

