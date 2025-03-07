import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onConnect: (walletType: string) => void
}

const wallets = [
  {
    name: "MetaMask",
    icon: "/metamask.svg",
    id: "metamask"
  },
  {
    name: "Phantom",
    icon: "/phantom.svg",
    id: "phantom"
  },
  {
    name: "WalletConnect",
    icon: "/walletconnect.svg",
    id: "walletconnect"
  },
  {
    name: "Coinbase Wallet",
    icon: "/coinbase.svg",
    id: "coinbase"
  }
]

export function WalletModal({ isOpen, onClose, onConnect }: WalletModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.id}
              variant="outline"
              className="w-full flex items-center justify-start gap-3 p-4 h-auto"
              onClick={() => onConnect(wallet.id)}
            >
              <Image
                src={wallet.icon}
                alt={wallet.name}
                width={32}
                height={32}
              />
              <span>{wallet.name}</span>
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}