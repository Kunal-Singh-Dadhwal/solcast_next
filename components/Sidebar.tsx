import Link from "next/link";
import { Home, Compass, LogInIcon as Subscription, History, Clock, ThumbsUp, Film } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
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
  );
}