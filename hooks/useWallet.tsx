import { useState, useCallback } from 'react'

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const connectWallet = useCallback(async (walletType: string) => {
    try {
      if (walletType === 'metamask') {
        if (typeof window.ethereum !== 'undefined') {
          const accounts = await window.ethereum.request({ 
            method: 'eth_requestAccounts' 
          })
          setAccount(accounts[0])
          setIsConnected(true)
        } else {
          window.open('https://metamask.io/download/', '_blank')
        }
      } 
      
      else if (walletType === 'phantom') {
        const { solana } = window
        
        if (!solana?.isPhantom) {
          window.open('https://phantom.app/', '_blank')
          return
        }

        try {
          const response = await solana.connect()
          setAccount(response.publicKey.toString())
          setIsConnected(true)
        } catch (err) {
          console.error('User rejected the connection request')
        }
      }

    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
    setIsModalOpen(false)
  }, [])

  const disconnectWallet = useCallback(async () => {
    try {
      if (window.solana?.isPhantom) {
        await window.solana.disconnect()
      }
      setAccount(null)
      setIsConnected(false)
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }, [])

  return {
    isConnected,
    account,
    isModalOpen,
    setIsModalOpen,
    connectWallet,
    disconnectWallet
  }
}