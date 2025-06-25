import { useState, useEffect } from "react";
import { bridgesConfig } from "../services/bridgeApi";
import BridgeCards from "../components/BridgeCards"; // Se till att du har denna komponent

type Chain = {
    name: string;
    chainId: number | null;
    icon: string;
    source: string;
};

type Bridge = {
    name: string;
    url: string;
};

const BridgeHelper = () => {
    const [chains, setChains] = useState<Chain[]>([]);
    const [chainFrom, setChainFrom] = useState<number | null>(null);
    const [chainTo, setChainTo] = useState<number | null>(null);
    const [showCards, setShowCards] = useState(false);
    const [shuffledBridges, setShuffledBridges] = useState<Bridge[]>([]);


    useEffect(() => {
        const loadAllChains = async () => {
            try {
                const allChainsPerBridge = await Promise.all(
                    bridgesConfig.map(async (bridge) => {
                        const chains = await bridge.fetchChains() as Chain[];


                        return chains.map(chain => ({ ...chain, source: bridge.sourceName }));
                    })
                );
                const merged = allChainsPerBridge.flat();

                setChains(merged);
            } catch (e) {
                console.error("Failed to load chains", e);
            }
        };

        loadAllChains();
    }, []);


    const isDisabled = !chainFrom || !chainTo || chainFrom === chainTo;

    function shuffleArray<T>(array: T[]): T[] {
        const arr = [...array];
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    const handleClick = () => {
        if (isDisabled) return;

        const bridges: Bridge[] = [];

        bridgesConfig.forEach(bridge => {
            const hasFrom = chains.some(c => c.chainId === chainFrom && c.source === bridge.sourceName);
            const hasTo = chains.some(c => c.chainId === chainTo && c.source === bridge.sourceName);
            if (hasFrom && hasTo) {
                bridges.push({ name: bridge.name, url: bridge.url });
            }
        });
        setShuffledBridges(shuffleArray(bridges));
        setShowCards(true);
        console.log("Chains with null chainId:", chains.filter(c => c.chainId === null));
    };

    const filteredChains = chains.filter((chain) => {
        if (chain.chainId === 1 && chain.name !== "Ethereum") return false;
        // add more filtering here
        return true;
    });


    const uniqueChains = Array.from(
        filteredChains.reduce((acc, chain) => {
            if (!chain.chainId) return acc;

            const existing = acc.get(chain.chainId);

            if (!existing || (!existing.icon && chain.icon)) {
                acc.set(chain.chainId, chain);
            }

            return acc;
        }, new Map<number, Chain>())
            .values()
    ).sort((a, b) => a.name.localeCompare(b.name));




    return (
        <div className="dark min-h-screen bg-gray-900 p-8 flex flex-col items-center text-white">
            <h1 className="text-3xl font-bold mb-6">Where to Bridge for Potential Airdrops</h1>

            {/* Select: From */}
            <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-medium mb-1">Chain to Bridge From</label>
                <select
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                    value={chainFrom ?? ""}
                    onChange={e => {
                        setChainFrom(Number(e.target.value));
                        setShowCards(false);
                    }}
                >
                    <option value="" disabled>Select a chain</option>
                    {uniqueChains.map(chain => (
                        <option key={chain.chainId} value={chain.chainId!}>{chain.name}</option>
                    ))}
                </select>
            </div>

            {/* Select: To */}
            <div className="mb-4 w-full max-w-md">
                <label className="block text-sm font-medium mb-1">Chain to Bridge To</label>
                <select
                    className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
                    value={chainTo ?? ""}
                    onChange={e => {
                        setChainTo(Number(e.target.value));
                        setShowCards(false);
                    }}
                >
                    <option value="" disabled>Select a chain</option>
                    {uniqueChains.map(chain => (
                        <option key={chain.chainId} value={chain.chainId!}>{chain.name}</option>
                    ))}
                </select>
            </div>

            {/* Button */}
            <button
                disabled={isDisabled}
                onClick={handleClick}
                className={`rounded px-4 py-2 text-white transition ${isDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                Find Bridge Options
            </button>

            {/* BridgeCards */}
            {showCards && (
                <BridgeCards from={chainFrom} to={chainTo} bridges={shuffledBridges} />
            )}

        </div>
    );
};

export default BridgeHelper;
