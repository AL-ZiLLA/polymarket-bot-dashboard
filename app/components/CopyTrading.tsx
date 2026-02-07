'use client';

import { useState } from 'react';

interface TopTrader {
  address: string;
  profit: number;
  winRate: number;
  trades: number;
  avgProfit: number;
}

// Mock top traders (will be real data from API)
const mockTopTraders: TopTrader[] = [
  {
    address: '0xsovereign2013...',
    profit: 1600000,
    winRate: 87,
    trades: 2341,
    avgProfit: 683.51,
  },
  {
    address: '0xFeatherLeather...',
    profit: 2200000,
    winRate: 92,
    trades: 1876,
    avgProfit: 1172.91,
  },
  {
    address: '0xlikebot...',
    profit: 520000,
    winRate: 84,
    trades: 3142,
    avgProfit: 165.50,
  },
];

export default function CopyTrading() {
  const [following, setFollowing] = useState<string[]>([]);
  const [customAddress, setCustomAddress] = useState('');
  const [showAddManual, setShowAddManual] = useState(false);

  const handleFollow = (address: string) => {
    if (following.includes(address)) {
      setFollowing(following.filter(a => a !== address));
    } else {
      setFollowing([...following, address]);
    }
  };

  const addCustomTrader = () => {
    if (customAddress && !following.includes(customAddress)) {
      setFollowing([...following, customAddress]);
      setCustomAddress('');
      setShowAddManual(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">Copy Trading</h2>
          <p className="text-gray-400">
            Auto-mirror successful traders or add your own
          </p>
        </div>
        <button
          onClick={() => setShowAddManual(!showAddManual)}
          className="px-4 py-2 bg-gmx-card border border-gmx-border rounded-lg hover:bg-gmx-dark transition"
        >
          + Add Manual
        </button>
      </div>

      {/* Manual Add Modal */}
      {showAddManual && (
        <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Add Trader Manually</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={customAddress}
              onChange={(e) => setCustomAddress(e.target.value)}
              placeholder="Enter Polymarket wallet address..."
              className="flex-1 px-4 py-2 bg-gmx-dark border border-gmx-border rounded-lg focus:outline-none focus:border-gmx-blue"
            />
            <button
              onClick={addCustomTrader}
              className="px-6 py-2 bg-gold text-black rounded-lg hover:bg-gold-dark transition font-semibold"
            >
              Add
            </button>
            <button
              onClick={() => setShowAddManual(false)}
              className="px-4 py-2 bg-gmx-dark border border-gmx-border rounded-lg hover:bg-gmx-card transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Top Traders List */}
      <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">🔥 Top Traders (80%+ Win Rate)</h3>
          <div className="text-sm text-gray-400">
            Updated every 5 minutes
          </div>
        </div>

        <div className="space-y-3">
          {mockTopTraders.map((trader) => (
            <div
              key={trader.address}
              className="flex items-center justify-between p-4 bg-gmx-darker border border-gmx-border rounded-lg hover:border-gmx-blue transition"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="font-mono text-sm">{trader.address}</div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    {trader.winRate}% Win Rate
                  </div>
                </div>
                <div className="flex gap-6 text-sm text-gray-400">
                  <div>
                    Total Profit: <span className="text-green-400 font-semibold">
                      ${trader.profit.toLocaleString()}
                    </span>
                  </div>
                  <div>Trades: {trader.trades}</div>
                  <div>Avg: ${trader.avgProfit}</div>
                </div>
              </div>
              
              <button
                onClick={() => handleFollow(trader.address)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  following.includes(trader.address)
                    ? 'bg-red-500/20 text-red-400 border border-red-500/50'
                    : 'bg-gold text-black hover:bg-gold-dark'
                }`}
              >
                {following.includes(trader.address) ? 'Unfollow' : 'Follow'}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Following Summary */}
      {following.length > 0 && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-6">
          <h3 className="text-lg font-bold text-green-400 mb-2">
            ✅ Following {following.length} Trader{following.length > 1 ? 's' : ''}
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Your bot will automatically copy their trades when they execute.
          </p>
          <div className="flex flex-wrap gap-2">
            {following.map((addr) => (
              <div
                key={addr}
                className="px-3 py-1 bg-gmx-card border border-gmx-border rounded text-sm font-mono"
              >
                {addr}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Copy Settings */}
      <div className="bg-gmx-card border border-gmx-border rounded-lg p-6">
        <h3 className="text-xl font-bold mb-4">Copy Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Max Copy Amount
            </label>
            <input
              type="number"
              defaultValue={50}
              className="w-full px-4 py-2 bg-gmx-dark border border-gmx-border rounded-lg focus:outline-none focus:border-gmx-blue"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Copy Ratio (% of their trade size)
            </label>
            <input
              type="number"
              defaultValue={10}
              min={1}
              max={100}
              className="w-full px-4 py-2 bg-gmx-dark border border-gmx-border rounded-lg focus:outline-none focus:border-gmx-blue"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
