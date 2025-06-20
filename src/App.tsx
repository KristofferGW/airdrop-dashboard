import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import BridgeHelper from "./pages/BridgeHelper";
import { opportunities } from './data/opportunities'
import type { Asset, AirdropOpportunity } from './data/opportunities'

const assetOptions: Asset[] = ['BTC', 'ETH', 'SOL', 'SUI', 'Stablecoins', 'HYPE']

function HomePage() {
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null)
  const [selectedOpportunity, setSelectedOpportunity] = useState<AirdropOpportunity | null>(null)

  const handleSelectAsset = (asset: Asset) => {
    setSelectedAsset(asset)

    const filtered = opportunities.filter((opp) => opp.assets.includes(asset))
    if (filtered.length > 0) {
      const randomIndex = Math.floor(Math.random() * filtered.length)
      setSelectedOpportunity(filtered[randomIndex])
    } else {
      setSelectedOpportunity(null)
    }
  }

  return (
    <div className="dark min-h-screen bg-gray-900 p-8 flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-6">Curated Airdrop Opportunity Picker</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
        {assetOptions.map((asset) => (
          <button
            key={asset}
            onClick={() => handleSelectAsset(asset)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {asset}
          </button>
        ))}
      </div>

      {selectedOpportunity ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md text-center text-white">
          <h2 className="text-xl font-bold mb-2">{selectedOpportunity.name}</h2>
          <p className="text-gray-300 mb-2">
            Assets: {selectedOpportunity.assets.join(', ')}
          </p>
          <p className="text-gray-300 mb-2">Chain: {selectedOpportunity.chains.join(', ')}</p>
          <a
            href={selectedOpportunity.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Website
          </a>
          <Link
            to="/bridge-helper"
            className="block mt-2 text-blue-400 underline hover:text-blue-300"
          >
            Where to bridge for potential airdrops
          </Link>
        </div>
      ) : selectedAsset ? (
        <p className="text-gray-400">No opportunities found for {selectedAsset}.</p>
      ) : null}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/bridge-helper" element={<BridgeHelper />} />
    </Routes>
  );
}
