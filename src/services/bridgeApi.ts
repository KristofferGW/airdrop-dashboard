export const fetchBungeeChains = async () => {
    const res = await fetch("https://public-backend.bungee.exchange/api/v1/supported-chains");
    if (!res.ok) throw new Error("Failed to fetch Bungee chains");
    const data = await res.json();

    return data.result
        .filter((chain: any) => chain.sendingEnabled && chain.receivingEnabled)
        .map((chain: any) => ({
            name: chain.name,
            chainId: chain.chainId,
            icon: chain.icon,
            source: "Bungee"
        }));
};

export const fetchDebridgeChains = async () => {
    const res = await fetch("https://dln.debridge.finance/v1.0/supported-chains-info");
    if (!res.ok) throw new Error("Failed to fetch deBridge chains");
    const data = await res.json();

    return data.chains.map((chain: any) => ({
      name: chain.chainName,
      chainId: chain.originalChainId,
      icon: null,
      source: "deBridge"
    }));
};

export const fetchJumperChains = async () => {
    const res = await fetch("https://li.quest/v1/chains");
    if (!res.ok) throw new Error("Failed to fetch Jumper chains");
    const data = await res.json();

    return data.chains.map((chain: any) => ({
        name: chain.name,
        chainId: chain.id ?? null,
        icon: chain.logoURI ?? "",
        source: "Jumper"
    }));
};

export const fetchStargateChains = async () => {
    const res = await fetch("https://stargate.finance/api/v1/chains");
    if (!res.ok) throw new Error("Failed to fetch Stargate chains");
    const data = await res.json();

    return data.chains.map((chain: any) => ({
        name: chain.name,
        chainId: chain.chainId ?? null,
        icon: "",
        source: "Stargate"
    }));
};

export const bridgesConfig = [
  {
    name: "Bungee Exchange",
    url: "https://www.bungee.exchange",
    fetchChains: fetchBungeeChains,
    sourceName: "Bungee",
  },
  {
    name: "deBridge",
    url: "https://debridge.finance",
    fetchChains: fetchDebridgeChains,
    sourceName: "deBridge",
  },
  {
    name: "Jumper Exchange",
    url: "https://www.jumper.exchange",
    fetchChains: fetchJumperChains,
    sourceName: "Jumper",
  },
  {
    name: "Stargate Finance",
    url: "https://stargate.finance/transfer",
    fetchChains: fetchStargateChains,
    sourceName: "Stargate",
  },
];