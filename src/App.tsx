import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Layout
import AppLayout from './components/Layout/AppLayout';

// Pages
import HomePage from './pages/HomePage';
import WalletPage from './pages/WalletPage';
import CreateExpensePage from './pages/CreateExpensePage';
import ParticipantsPage from './pages/ParticipantsPage';
import NotFoundPage from './pages/NotFoundPage';

// Context
import { WalletProvider } from './context/WalletContext';

function App() {
  return (
    <WalletProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path="wallet" element={<WalletPage />} />
            <Route path="create-expense" element={<CreateExpensePage />} />
            <Route path="participants" element={<ParticipantsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;