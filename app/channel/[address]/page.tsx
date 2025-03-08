import Image from "next/image"
import { Contract } from "@/components/contract"
import { Button } from "@/components/ui/button"
import {
  Bell,
  MoreHorizontal,
  ThumbsUp,
  Home,
  Compass,
  Library,
  History,
  PlaySquare,
  ThumbsDown,
  Search,
} from "lucide-react"


export default function CreatorProfile(address: string) {
  return (
    <div className="flex flex-col w-full">
      {/* Enhanced Header with Navigation */}
      <header className="sticky top-0 z-10 bg-background border-b w-full">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Brand */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-brand">
                <PlaySquare className="h-6 w-6 fill-current" />
                <span className="font-bold ml-1 hidden sm:inline">VideoHub</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full h-10 px-4 rounded-l-full border border-r-0 focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <button className="absolute right-0 top-0 h-10 px-4 bg-muted rounded-r-full border border-l-0">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links - Desktop */}
            <div className="hidden md:flex items-center gap-6">
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Home className="h-5 w-5" />
                <span className="text-xs">Home</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Compass className="h-5 w-5" />
                <span className="text-xs">Explore</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <Library className="h-5 w-5" />
                <span className="text-xs">Library</span>
              </Button>
              <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
                <History className="h-5 w-5" />
                <span className="text-xs">History</span>
              </Button>
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <div className="h-8 w-8 rounded-full bg-muted overflow-hidden">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="User avatar"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden items-center justify-between mt-2 pt-2 border-t">
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Home className="h-5 w-5" />
              <span className="text-xs">Home</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Compass className="h-5 w-5" />
              <span className="text-xs">Explore</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <Library className="h-5 w-5" />
              <span className="text-xs">Library</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex flex-col items-center gap-1">
              <History className="h-5 w-5" />
              <span className="text-xs">History</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main content - full width */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Content area */}
        <div className="w-full p-4">
          {/* Creator banner */}
          <div className="w-full h-40 sm:h-56 md:h-64 bg-muted rounded-lg overflow-hidden">
            <Image
              src="/placeholder.svg?height=256&width=1280"
              alt="Channel banner"
              width={1280}
              height={256}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Channel info */}
          <div className="mt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-center md:justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=96&width=96"
                    alt="Creator avatar"
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold">Creator Name</h1>
                  <p className="text-sm text-muted-foreground">1.2M subscribers</p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto justify-center md:justify-start">
                <Button className="bg-primary hover:bg-primary/90 text-white">Subscribe</Button>
                <Button variant="outline" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Creator description */}
            <div className="mt-6 p-4 rounded-lg bg-muted">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-semibold">About</h2>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>Like</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    <ThumbsDown className="h-4 w-4" />
                    <span>Dislike</span>
                  </Button>
                </div>
              </div>
              <p className="mt-4 text-sm">
                Welcome to my channel! I create content about technology, programming, and digital creativity. Join me
                as we explore the latest trends, tools, and techniques in the digital world. New videos every Tuesday
                and Friday.
              </p>
              <div className="mt-4 text-xs text-muted-foreground">
                <p>Channel created: January 15, 2018</p>
                <p>Total views: 24.5M</p>
              </div>
            </div>
          </div>

          {/* Content tabs */}
          <div className="mt-6 border-b overflow-x-auto">
            <div className="flex gap-4 min-w-max pb-2">
              <Button variant="ghost" className="font-semibold">
                Videos
              </Button>
              <Button variant="ghost" className="font-semibold">
                Playlists
              </Button>
              <Button variant="ghost" className="font-semibold">
                Community
              </Button>
              <Button variant="ghost" className="font-semibold">
                Channels
              </Button>
              <Button variant="ghost" className="font-semibold">
                About
              </Button>
              <Button variant="ghost" className="font-semibold">
                Live
              </Button>
              <Button variant="ghost" className="font-semibold">
                Podcasts
              </Button>
              <Button variant="ghost" className="font-semibold">
                Memberships
              </Button>
            </div>
          </div>

          {/* Video grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Video items - adding placeholder items */}
            {Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <Image
                    src={`/placeholder.svg?height=180&width=320&text=Video+${index + 1}`}
                    alt={`Video thumbnail ${index + 1}`}
                    width={320}
                    height={180}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex gap-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-muted overflow-hidden shrink-0">
                    <Image
                      src="/placeholder.svg?height=32&width=32"
                      alt="Creator avatar"
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm line-clamp-2">
                      Video Title {index + 1} - Amazing Content for Everyone
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">Creator Name</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.floor(Math.random() * 900) + 100}K views • {Math.floor(Math.random() * 11) + 1} months ago
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
