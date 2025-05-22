import React from 'react';
import { Wallet } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWallet } from '../../context/WalletContext';

const WalletConnect: React.FC = () => {
  const { connectWallet, isConnected } = useWallet();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
    >
      <div className="flex items-center gap-3 mb-6">
        <motion.div 
          whileHover={{ rotate: 15 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="p-2 bg-cyan-500/10 rounded-lg"
        >
          <Wallet className="h-6 w-6 text-cyan-400" />
        </motion.div>
        <div>
          <h2 className="text-2xl font-bold text-white">Sui Wallet</h2>
          <p className="text-gray-300">
            {isConnected 
              ? "Your wallet is connected" 
              : "Connect your wallet to start using SuiSplit"}
          </p>
        </div>
      </div>

      {!isConnected && (
        <motion.button
          onClick={connectWallet}
          whileHover={{ scale: 1.02, backgroundColor: 'rgba(8, 145, 178, 0.9)' }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-3 px-6 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-900 shadow-md shadow-cyan-500/20 shadow-pulse"
        >
          Connect Wallet
        </motion.button>
      )}
    </motion.div>
  );
};

export default WalletConnect;