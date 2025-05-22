import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import NavBar from './NavBar';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Toaster position="top-right" />
      <NavBar />
      
      <header className="w-full py-6 border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold gradient-text-animate"
          >
            SuiSplit
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-300 mt-2"
          >
            Decentralized Bill-Splitting on Sui Blockchain
          </motion.p>
        </div>
      </header>
      
      <main className="container mx-auto py-8 px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout; 