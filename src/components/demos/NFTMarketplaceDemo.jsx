import React, { useState } from "react";
export default function NFTMarketplaceDemo() {
  const [nfts, setNfts] = useState(Array.from({ length: 6 }, (_, i) => ({ id: i, name: `NFT #${i + 1}`, owner: 'You', img: `https://placehold.co/200x200/14b8a6/fff?text=NFT${i + 1}` })));
  const [minting, setMinting] = useState(false);
  function mint() {
    setMinting(true);
    setTimeout(() => {
      setNfts(nfts => [...nfts, { id: nfts.length, name: `NFT #${nfts.length + 1}`, owner: 'You', img: `https://placehold.co/200x200/14b8a6/fff?text=NFT${nfts.length + 1}` }]);
      setMinting(false);
    }, 1200);
  }
  return (
    <div className="w-full max-w-xl mx-auto">
      <h3 className="text-2xl font-bold text-white mb-4">NFT Marketplace</h3>
      <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 mb-4" onClick={mint} disabled={minting}>{minting ? 'Minting...' : 'Mint NFT'}</button>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {nfts.map(nft => (
          <div key={nft.id} className="bg-gray-800 border border-gray-600 rounded-lg p-2 flex flex-col items-center">
            <img src={nft.img} alt={nft.name} className="rounded mb-2" />
            <div className="text-white text-sm font-medium mb-1">{nft.name}</div>
            <div className="text-xs text-gray-400">Owner: {nft.owner}</div>
          </div>
        ))}
      </div>
    </div>
  );
} 