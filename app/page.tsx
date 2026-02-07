'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import WalletConnect from './components/WalletConnect';
import ModeSelector from './components/ModeSelector';
import CopyTrading from './components/CopyTrading';

// Mock data for live chart
const generateMockData = () => {
  const data = [];
  let profit = 0;
  for (let i = 0; i < 20; i++) {
    profit += Math.random() * 2 - 0.5;
    data.push({
      time: `${i}h`,
      profit: Math.max(0, profit),
    });
  }
  return data;
};

export default function Dashboard() {
  const [mode, setMode] = useState<'arbitrage' | 'copy'>('arbitrage');
  const [stats, setStats] = useState({
    runtime: '0h 0m',
    totalTrades: 0,
    totalProfit: 0,
    successRate: 100,
  });

  const [chartData, setChartData] = useState(generateMockData());
  const [isRunning, setIsRunning] = useState(false);

  // Simulate live updates
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        totalTrades: prev.totalTrades + 1,
        totalProfit: prev.totalProfit + (Math.random() * 5),
      }));

      setChartData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push({
          time: `${newData.length}h`,
          profit: (newData[newData.length - 1]?.profit || 0) + (Math.random() * 2),
        });
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="min-h-screen bg-gmx-dark">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gmx-darker border-r border-gmx-border">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gold mb-8">⚡ Polymarket Bot</h1>
          
          <nav className="space-y-2">
            <div className="px-4 py-3 bg-gmx-card rounded-lg text-white cursor-pointer">
              📊 Dashboard
            </div>
            <div className="px-4 py-3 text-gray-400 hover:text-white cursor-pointer">
              💼 Positions
            </div>
            <div className="px-4 py-3 text-gray-400 hover:text-white cursor-pointer">
              📈 History
            </div>
            <div className="px-4 py-3 text-gray-400 hover:text-white cursor-pointer">
              ⚙️ Settings
            </div>
            <div className="px-4 py-3 text-gray-400 hover:text-white cursor-pointer">
              💰 Wallet
            </div>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <WalletConnect />
        </div>

        {/* Mode Selector */}
        <div className="mb-8">
          <ModeSelector mode={mode} setMode={setMode} />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Runtime</div>
            <div className="text-2xl font-bold">{stats.runtime}</div>
          </div>
          <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Total Trades</div>
            <div className="text-2xl font-bold">{stats.totalTrades}</div>
          </div>
          <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Total Profit</div>
            <div className="text-2xl font-bold text-green-400">${stats.totalProfit.toFixed(2)}</div>
          </div>
          <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
            <div className="text-gray-400 text-sm mb-2">Success Rate</div>
            <div className="text-2xl font-bold text-green-400">{stats.successRate}%</div>
          </div>
        </div>

        {/* Copy Trading or Arbitrage */}
        {mode === 'copy' ? (
          <CopyTrading />
        ) : (
          <>
            {/* Bot Control */}
            <div className="bg-gmx-card border border-gmx-border rounded-lg p-6 mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">Arbitrage Bot</h3>
                  <p className="text-gray-400">
                    {isRunning ? '🟢 Running - Scanning for opportunities...' : '🔴 Stopped'}
                  </p>
                </div>
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`px-8 py-3 rounded-lg font-semibold transition ${
                    isRunning
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-green-500 hover:bg-green-600'
                  } text-white`}
                >
                  {isRunning ? 'Stop Bot' : 'Start Bot'}
                </button>
              </div>
            </div>

        {/* Live Profit Chart */}
        <div className="bg-gmx-card border border-gmx-border rounded-lg p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">Profit Over Time</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#262B33" />
              <XAxis dataKey="time" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#16191E',
                  border: '1px solid #262B33',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#FFD700"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

            {/* Active Positions */}
            <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Active Positions</h3>
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-gmx-border">
                    <th className="pb-3">Market</th>
                    <th className="pb-3">Side</th>
                    <th className="pb-3">Entry</th>
                    <th className="pb-3">Size</th>
                    <th className="pb-3">P&L</th>
                  </tr>
                </thead>
                <tbody className="text-gray-400">
                  <tr>
                    <td colSpan={5} className="pt-8 text-center">
                      {isRunning ? 'Scanning for opportunities...' : 'Start bot to begin trading'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
