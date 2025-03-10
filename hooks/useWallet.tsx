import { useState, useCallback } from 'react'

export function useWallet() {
  const [isConnected, setIsConnected] = useState(false)
  const [account, setAccount] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false) 
  const [walletType, setWalletType] = useState<string | null>(null)

  const connectWallet = useCallback(async (type: string) => {
    try {
      switch (type) {
        case 'metamask':
          if (typeof window.ethereum !== 'undefined') {
            const accounts = await window.ethereum.request({
              method: 'eth_requestAccounts'
            })
            setAccount(accounts[0])
            setIsConnected(true)
            setWalletType('metamask')
          } else {
            window.open('https://metamask.io/download/', '_blank')
          }
          break;

          case 'phantom':
            console.log('Solana object:', window.solana); 
            console.log('Attempting Phantom connection...');
            
            if (!('solana' in window)) {
              console.log('Phantom wallet not found');
              window.open('https://phantom.app/', '_blank');
              return;
            }
          
            try {
              const provider = window.solana;
              
              if (!provider.isPhantom) {
                console.log('Not a Phantom wallet');
                window.open('https://phantom.app/', '_blank');
                return;
              }
          
              console.log('Requesting connection...');
              const resp = await provider.connect({ onlyIfTrusted: false });
              console.log('Connection response:', resp);
              
              setAccount(resp.publicKey.toString());
              setIsConnected(true);
              setWalletType('phantom');
            } catch (err) {
              console.error('Detailed connection error:', err);
            }
            break;

        case 'trust':
          try {
            if (typeof window.ethereum?.isTrust !== 'undefined') {
              const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
              })
              setAccount(accounts[0])
              setIsConnected(true)
              setWalletType('trust')
            } else {
              window.open('https://trustwallet.com/browser-extension', '_blank')
            }
          } catch (err) {
            console.error('Trust Wallet connection error:', err)
          }
          break;

        case 'coinbase':
          try {
            if (typeof window.ethereum?.isCoinbaseWallet !== 'undefined') {
              const accounts = await window.ethereum.request({
                method: 'eth_requestAccounts'
              })
              setAccount(accounts[0])
              setIsConnected(true)
              setWalletType('coinbase')
            } else {
              window.open('https://www.coinbase.com/wallet/downloads', '_blank')
            }
          } catch (err) {
            console.error('Coinbase Wallet connection error:', err)
          }
          break;

        default:
          console.error('Unsupported wallet type')
      }
    } catch (error) {
      console.error('Error connecting wallet:', error)
    }
    setIsModalOpen(false)
  }, [])

  const disconnectWallet = useCallback(async () => {
    try {
      switch (walletType) {
        case 'phantom':
          if (window.solana?.isPhantom) {
            await window.solana.disconnect()
          }
          break;
        
        case 'trust':
        case 'metamask':
        case 'coinbase':
          // These wallets don't require explicit disconnection
          break;
      }
      setAccount(null)
      setIsConnected(false)
      setWalletType(null)
    } catch (error) {
      console.error('Error disconnecting wallet:', error)
    }
  }, [walletType])

  return {
    isConnected,
    account,
    isModalOpen,
    setIsModalOpen,
    connectWallet,
    disconnectWallet,
    walletType
  }
}