import React, { createContext, useState, useContext, ReactNode } from 'react';
import toast from 'react-hot-toast';

interface WalletContextType {
  walletAddress: string;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [walletAddress, setWalletAddress] = useState<string>('');
  const [isConnected, setIsConnected] = useState<boolean>(false);

  const connectWallet = async () => {
    try {
      // TODO: Here you would implement actual wallet connection logic
      // using @mysten/sui.js. For now, we'll use a placeholder address
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Mock successful connection
      const mockAddress = '0xMOCK123456789ABCDEF123456789ABCDEF123456789ABC';
      setWalletAddress(mockAddress);
      setIsConnected(true);
      toast.success('Wallet connected successfully');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const disconnectWallet = () => {
    // TODO: Implement actual disconnect logic with sui.js
    setWalletAddress('');
    setIsConnected(false);
    toast.success('Wallet disconnected');
  };

  return (
    <WalletContext.Provider
      value={{
        walletAddress,
        isConnected,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export default WalletContext; 