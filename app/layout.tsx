import type { Metadata } from "next";
import { WalletModal } from "@/components/wallet/WalletModal";
import { Film } from "lucide-react";
import { useWallet } from "@/hooks/useWallet";
import { Button } from "@/components/ui/button";
import "./globals.css";

export const metadata: Metadata = {
  title: "Solcast",
  description: "Created by Solcast",
  generator: "Solcast",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const {
    isConnected,
    account,
    isModalOpen,
    setIsModalOpen,
    connectWallet,
    disconnectWallet,
  } = useWallet();
  return (
    <html lang="en">
      <body>
        <div className="flex-1 overflow-auto">
          {/* Header */}
          <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
            <div className="md:hidden flex items-center gap-2">
              <Film className="h-6 w-6 text-red-600" />
              <h1 className="text-xl font-bold">Solcast</h1>
            </div>

            <div className="hidden md:flex items-center flex-1 max-w-2xl mx-auto">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-full px-4 py-2 rounded-l-md border focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <Button className="absolute right-0 rounded-l-none">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {isConnected ? (
                <Button variant="outline" onClick={disconnectWallet}>
                  {account?.slice(0, 6)}...{account?.slice(-4)}
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsModalOpen(true)}>
                  Connect Wallet
                </Button>
              )}
            </div>
          </header>
          <WalletModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onConnect={connectWallet}
          />
        </div>
        {children}
      </body>
    </html>
  );
}
