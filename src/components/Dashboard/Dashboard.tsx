import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card, Title, AreaChart, BarChart, DonutChart } from '@tremor/react';
import { Activity, TrendingUp, Users } from 'lucide-react';
import StatCard from './StatCard';
import AnimatedLineChart from './AnimatedLineChart';
import { getBalance } from '../../sui/queries';

interface ExpenseData {
  date: string;
  expenses: number;
  income: number;
}

interface ParticipantDebt {
  name: string;
  amount: number;
}

const monthlyData: ExpenseData[] = [
  { date: 'Jan', expenses: 250, income: 400 },
  { date: 'Feb', expenses: 300, income: 150 },
  { date: 'Mar', expenses: 200, income: 950 },
  { date: 'Apr', expenses: 278, income: 400 },
  { date: 'May', expenses: 189, income: 475 },
  { date: 'Jun', expenses: 239, income: 380 },
  { date: 'Jul', expenses: 349, income: 430 },
];

const participantDebts: ParticipantDebt[] = [
  { name: 'Alice', amount: 49.99 },
  { name: 'Bob', amount: 25.50 },
  { name: 'Charlie', amount: 15.75 },
];

const coinIllustration = (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
    <ellipse cx="24" cy="40" rx="16" ry="4" fill="#00D2D3" fillOpacity="0.18" />
    <circle cx="24" cy="24" r="14" fill="#00D2D3" />
    <circle cx="24" cy="24" r="10" fill="#fff" fillOpacity="0.9" />
    <text x="24" y="29" textAnchor="middle" fontSize="16" fill="#00D2D3" fontWeight="bold">$</text>
  </svg>
);

const Dashboard: React.FC = () => {
  const totalOwed = participantDebts.reduce((sum, debt) => sum + debt.amount, 0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
    }
  };

  // SAMPLE: Fetch and display Sui balance for a test address
  const [suiBalance, setSuiBalance] = useState<string | null>(null);
  useEffect(() => {
    getBalance('0x9cfb...M0CK')
      .then((res) => setSuiBalance(res.totalBalance ? res.totalBalance : '0'))
      .catch(() => setSuiBalance('Error'));
  }, []);

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-8"
    >
      {/* Sui Balance Card */}
      <Card className="mb-4 bg-gradient-to-r from-cyan-700/40 to-cyan-900/40 border-cyan-500/30 shadow-lg">
        <div className="flex items-center gap-4">
          <img src="https://cryptologos.cc/logos/sui-sui-logo.png" alt="Sui" className="h-8 w-8" />
          <div>
            <div className="text-lg font-bold text-cyan-300">Sui Balance (0x9cfb...M0CK)</div>
            <div className="text-2xl font-mono text-white">{suiBalance === null ? 'Loading...' : suiBalance}</div>
          </div>
        </div>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <StatCard
          title="Total Balance"
          value={totalOwed}
          prefix="$"
          icon={<TrendingUp className="h-7 w-7 text-white" />}
          gradientFrom="from-[#00D2D3]"
          gradientTo="to-[#192a56]"
          sparklineData={[50, 60, 55, 70, 68, 91, 92]}
          illustration={coinIllustration}
        />
        <StatCard
          title="Monthly Transactions"
          value={349}
          suffix=" txns"
          icon={<Activity className="h-7 w-7 text-white" />}
          gradientFrom="from-[#6C5CE7]"
          gradientTo="to-[#341f97]"
          percentChange={+2.3}
          percentColor="text-emerald-400"
          sparklineData={[40, 60, 80, 120, 100, 140, 130]}
        />
        <StatCard
          title="Active Participants"
          value={participantDebts.length}
          icon={<Users className="h-7 w-7 text-white" />}
          gradientFrom="from-[#00B894]"
          gradientTo="to-[#222f3e]"
          avatars={["A", "B", "C"]}
        />
      </div>

      {/* Charts */}
      <motion.div 
        variants={cardVariants}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <motion.div variants={cardVariants}>
          <Card className="shadow-lg border border-gray-700/50">
            <Title>Monthly Expense Trends</Title>
            <div className="h-72 mt-6">
              <AnimatedLineChart
                data={monthlyData.map(d => ({ x: d.date, y: d.expenses }))}
                color="#6C5CE7"
                gradientFrom="#6C5CE7"
                gradientTo="#00D2D3"
                width={400}
                height={220}
              />
            </div>
          </Card>
        </motion.div>

        <motion.div variants={cardVariants}>
          <Card className="shadow-lg border border-gray-700/50">
            <Title>Recent Expenses Comparison</Title>
            <BarChart
              className="h-72 mt-6"
              data={monthlyData.slice(-3)}
              index="date"
              categories={["expenses", "income"]}
              colors={["purple", "cyan"]}
              valueFormatter={(number) => `$${number.toFixed(2)}`}
            />
          </Card>
        </motion.div>
      </motion.div>

      <motion.div variants={cardVariants}>
        <Card className="shadow-lg border border-gray-700/50">
          <Title>Participant Debt Distribution</Title>
          <DonutChart
            className="h-80 mt-6"
            data={participantDebts}
            category="amount"
            index="name"
            valueFormatter={(number) => `$${number.toFixed(2)}`}
            colors={["cyan", "violet", "indigo"]}
          />
        </Card>
      </motion.div>
    </motion.div>
  );
};

export default Dashboard;