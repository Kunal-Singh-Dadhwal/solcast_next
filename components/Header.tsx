import Link from "next/link";
import { Film } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
      <div className="md:hidden flex items-center gap-2">
        <Button variant="ghost" onClick={toggleSidebar}>
          <Film className="h-6 w-6 text-red-600" />
        </Button>
        <h1 className="text-xl font-bold">Solcast</h1>
      </div>

      <div className="hidden md:flex items-center flex-1 max-w-2xl mx-auto">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search"
            className="w-full px-4 py-2 rounded-1-md border focus:outline-none focus:ring-2 focus:ring-primary focus:rounded-lg"
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
  );
}