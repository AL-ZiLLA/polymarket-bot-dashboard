'use client';

import { useState } from 'react';

export default function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState('');

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ 
          method: 'eth_requestAccounts' 
        });
        setAddress(accounts[0]);
        setIsConnected(true);
      } catch (error) {
        console.error('Error connecting wallet:', error);
      }
    } else {
      alert('Please install MetaMask!');
    }
  };

  if (isConnected) {
    return (
      <div className="flex items-center gap-3">
        <div className="px-4 py-2 bg-gmx-card border border-gmx-border rounded-lg text-sm">
          {address.slice(0, 6)}...{address.slice(-4)}
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-6 py-3 bg-gold text-black rounded-lg font-bold hover:bg-gold-dark transition"
    >
      Connect Wallet
    </button>
  );
}
