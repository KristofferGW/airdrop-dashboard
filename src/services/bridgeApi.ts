import { wormhole } from "@wormhole-foundation/sdk";
import evm from '@wormhole-foundation/sdk/evm';
import solana from '@wormhole-foundation/sdk/solana';
import sui from '@wormhole-foundation/sdk/sui';
import { nativeChainIdMap } from "../constants/nativeChainIdMap";

export const fetchBungeeChains = async () => {
  const res = await fetch("https://public-backend.bungee.exchange/api/v1/supported-chains");
  if (!res.ok) throw new Error("Failed to fetch Bungee chains");
  const data = await res.json();

  return data.result
    .filter((chain: any) => chain.sendingEnabled && chain.receivingEnabled)
    .map((chain: any) => ({
      name: chain.name,
      chainId: nativeChainIdMap[chain.name] ?? chain.chainId,
      source: "Bungee"
    }));
};

export const fetchDebridgeChains = async () => {
  const res = await fetch("https://dln.debridge.finance/v1.0/supported-chains-info");
  if (!res.ok) throw new Error("Failed to fetch deBridge chains");
  const data = await res.json();

  return data.chains.map((chain: any) => ({
    name: chain.chainName,
    chainId: nativeChainIdMap[chain.chainName] ?? chain.originalChainId,
    source: "deBridge"
  }));
};

export const fetchJumperChains = async () => {
  const res = await fetch("https://li.quest/v1/chains");
  if (!res.ok) throw new Error("Failed to fetch Jumper chains");
  const data = await res.json();

  return data.chains.map((chain: any) => ({
    name: chain.name,
    chainId: chain.id,
    source: "Jumper"
  }));
};

export const fetchPortalChains = async () => {
  const wh = await wormhole("Mainnet", [evm, solana, sui]);

  const chains = Object.entries(wh.config.chains).map(([name, _chainCtx]) => {
    if (typeof _chainCtx.nativeChainId === "bigint") {
      return {
        name: name,
        chainId: Number(_chainCtx.nativeChainId),
        source: "Portal"
      };
    } else if (typeof _chainCtx.nativeChainId === "string") {
      return {
        name: name,
        chainId: _chainCtx.nativeChainId,
        source: "Portal"
      };
    } else {
      return null;
    }
  });

  return chains.filter(Boolean); // filtrerar bort null om nån chain inte matchade
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

console.log(await fetchPortalChains());

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
    name: "Portal",
    url: "https://portalbridge.com",
    fetchChains: fetchPortalChains,
    sourceName: "Portal",
  },
  {
    name: "Stargate Finance",
    url: "https://stargate.finance/transfer",
    fetchChains: fetchStargateChains,
    sourceName: "Stargate",
  },
];