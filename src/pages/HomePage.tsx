import React from 'react';
import Dashboard from '../components/Dashboard/Dashboard';

const HomePage: React.FC = () => {
  return (
    <>
      <div style={{ color: 'red', fontSize: 32, textAlign: 'center', margin: 32 }}>HOME TEST - If you see this, HomePage is rendering!</div>
      <Dashboard />
    </>
  );
};

export default HomePage; 