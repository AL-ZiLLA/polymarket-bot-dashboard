'use client';

export default function ModeSelector({ 
  mode, 
  setMode 
}: { 
  mode: 'arbitrage' | 'copy';
  setMode: (mode: 'arbitrage' | 'copy') => void;
}) {
  return (
    <div className="flex gap-3 p-2 bg-gmx-darker rounded-lg">
      <button
        onClick={() => setMode('arbitrage')}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
          mode === 'arbitrage'
            ? 'bg-gold text-black'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        🤖 Arbitrage Mode
      </button>
      <button
        onClick={() => setMode('copy')}
        className={`flex-1 px-6 py-3 rounded-lg font-semibold transition ${
          mode === 'copy'
            ? 'bg-gold text-black'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        👥 Copy Trading Mode
      </button>
    </div>
  );
}
