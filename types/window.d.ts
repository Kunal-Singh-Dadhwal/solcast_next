interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      isCoinbaseWallet?: boolean;
      isTrust?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
    };
    solana?: {
        isPhantom?: boolean;
        connect: (params: { onlyIfTrusted: boolean }) => Promise<{
          publicKey: { toString: () => string }
        }>;
        disconnect: () => Promise<void>;
      };
  }