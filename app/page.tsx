import Link from "next/link"
import { Home, Compass, LogInIcon as Subscription, History, Clock, ThumbsUp, Film } from "lucide-react"

import { Button } from "@/components/ui/button"
import VideoCard from "@/components/video-card"

export default function HomePage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 border-r p-4 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Film className="h-6 w-6 text-red-600" />
          <h1 className="text-xl font-bold">Solcast</h1>
        </div>

        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Home
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/explore">
              <Compass className="mr-2 h-4 w-4" />
              Explore
            </Link>
          </Button>
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link href="/subscriptions">
              <Subscription className="mr-2 h-4 w-4" />
              Subscriptions
            </Link>
          </Button>
        </div>

        <div className="pt-4 border-t">
          <h2 className="mb-2 text-sm font-semibold">Library</h2>
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start">
              <History className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <Clock className="mr-2 h-4 w-4" />
              Watch Later
            </Button>
            <Button variant="ghost" className="w-full justify-start">
              <ThumbsUp className="mr-2 h-4 w-4" />
              Liked Videos
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <h2 className="mb-2 text-sm font-semibold">Subscriptions</h2>
          <div className="space-y-3">
            {["Channel 1", "Channel 2", "Channel 3"].map((channel) => (
              <Link key={channel} href="/channel" className="flex items-center gap-2 hover:bg-accent rounded-md p-2">
                <div className="w-6 h-6 rounded-full bg-primary/20"></div>
                <span className="text-sm">{channel}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
          <div className="md:hidden flex items-center gap-2">
            <Film className="h-6 w-6 text-red-600" />
            <h1 className="text-xl font-bold">DecentTube</h1>
          </div>

          <div className="hidden md:flex items-center flex-1 max-w-2xl mx-auto">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button className="absolute right-0 rounded-l-none">Search</Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Add Wallet</Link>
            </Button>
            <Button asChild>
              <Link href="/subscriptions">Subscribe</Link>
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4">
          <h2 className="text-2xl font-bold mb-6">Recommended Videos</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <VideoCard
                key={i}
                id={`video-${i + 1}`}
                title={`Decentralized Web 3.0 Explained ${i + 1}`}
                channel={`Creator ${(i % 5) + 1}`}
                views={`${Math.floor(Math.random() * 900) + 100}K views`}
                timestamp={`${Math.floor(Math.random() * 11) + 1} days ago`}
                thumbnail={`/placeholder.svg?height=180&width=320&text=Video+${i + 1}`}
                avatar={`/placeholder.svg?height=40&width=40&text=C${(i % 5) + 1}`}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

