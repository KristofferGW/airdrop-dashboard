export type Asset = 'BTC' | 'ETH' | 'SOL' | 'SUI' | 'Stablecoins' | 'HYPE'

export interface AirdropOpportunity {
  name: string
  assets: Asset[]
  link: string
  chains: string[]
}

export const opportunities: AirdropOpportunity[] = [
  {
    name: 'Infrared Finance',
    assets: ['ETH', 'BTC', 'Stablecoins'],
    link: 'https://infrared.finance/',
    chains: ['Berachain']
  },
  {
    name: 'HyperLend',
    assets: ['HYPE', 'BTC', 'ETH', 'SOL', 'Stablecoins'],
    link: 'https://app.hyperlend.finance/',
    chains: ['HyperEVM']
  },
  {
    name: 'Felix',
    assets: ['HYPE', 'BTC', 'ETH', 'Stablecoins', 'SOL'],
    link: 'https://usefelix.xyz/',
    chains: ['HyperEVM']
  },
  {
    name: 'Kodiak Finance',
    assets: ['HYPE', 'ETH', 'Stablecoins'],
    link: 'https://hypecoin.xyz/airdrop',
    chains: ['HyperEVM']
  },
  {
    name: 'HypurFi Lending',
    assets: ['HYPE', 'BTC', 'ETH', 'Stablecoins'],
    link: 'https://app.hypurfi.fi/',
    chains: ['HyperEVM']
  },
  {
    name: 'Valantis',
    assets: ['HYPE'],
    link: 'https://app.valantis.xyz/',
    chains: ['HyperEVM']
  },
  {
    name: 'Level',
    assets: ['Stablecoins'],
    link: 'https://app.level.money/farm',
    chains: ['Ethereum']
  },
  {
    name: 'Ostium',
    assets: ['Stablecoins'],
    link: 'http://ostium.app/trade',
    chains: ['Ethereum', 'Arbitrum', 'Base']
  },
  {
    name: 'Nansen',
    assets: ['HYPE', 'SOL', 'SUI'],
    link: 'https://stake.nansen.ai/explore',
    chains: ['Solana', 'Sui', 'HyperEVM']
  },
  {
    name: 'Momentum',
    assets: ['SUI', 'BTC', 'ETH', 'Stablecoins'],
    link: 'https://app.mmt.finance/',
    chains: ['Sui']
  },
  {
    name: 'Kinetiq',
    assets: ['HYPE'],
    link: 'https://kinetiq.xyz/',
    chains: ['HyperEVM']
  },
  {
    name: 'Harmonix',
    assets: ['HYPE', 'Stablecoins'],
    link: 'https://app.harmonix.fi/',
    chains: ['HyperEVM']
  },
  {
    name: 'Staked HYPE',
    assets: ['HYPE'],
    link: 'https://stakedhype.fi/',
    chains: ['HyperEVM']
  },
  {
    name: 'Hyperbeat',
    assets: ['HYPE', 'Stablecoins', 'BTC'],
    link: 'https://stakedhype.fi/',
    chains: ['HyperEVM']
  },
  {
    name: 'Neutral Trade',
    assets: ['Stablecoins', 'SOL', 'ETH', 'BTC'],
    link: 'https://app.neutral.trade/',
    chains: ['Solana', 'Ethereum', 'HyperEVM']
  },
  {
    name: 'SaltLayer',
    assets: ['BTC'],
    link: 'https://app.satlayer.xyz/vaults/restake',
    chains: ['Sui', 'Ethereum', 'Berachain']
  },
  {
    name: 'Perena',
    assets: ['Stablecoins'],
    link: 'https://app.satlayer.xyz/vaults/restake',
    chains: ['Solana']
  },
  {
    name: 'RateX',
    assets: ['Stablecoins', 'BTC', 'SOL'],
    link: 'https://app.rate-x.io/',
    chains: ['Solana']
  },
  {
    name: 'Exponent Income',
    assets: ['SOL', 'BTC', 'Stablecoins'],
    link: 'https://www.exponent.finance/income',
    chains: ['Solana']
  },
  {
    name: 'Hyperdrive',
    assets: ['Stablecoins', 'HYPE'],
    link: 'https://app.hyperdrive.fi/earn',
    chains: ['Solana', 'HyperEVM']
  },
  {
    name: 'STEAMM',
    assets: ['SUI', 'Stablecoins', ],
    link: 'https://steamm.fi/',
    chains: ['Sui']
  },
  {
    name: 'HYBRA',
    assets: ['HYPE', 'Stablecoins'],
    link: 'https://www.hybra.finance/',
    chains: ['HyperEVM']
  }
]
