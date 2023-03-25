import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { mainnet, optimism, goerli, polygonMumbai, polygon, zkSync, zkSyncTestnet, optimismGoerli } from 'wagmi/chains'
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { WagmiConfig, createClient, configureChains } from 'wagmi'
import { getDefaultProvider } from 'ethers'
import { InjectedConnector } from 'wagmi/connectors/injected';

// const client = createClient({
//   autoConnect: true,
//   provider: getDefaultProvider(),
// })

const { chains, provider } = configureChains(
  [mainnet, optimism, goerli, polygon, polygonMumbai, zkSync, zkSyncTestnet, optimismGoerli],
  [alchemyProvider({ apiKey: 'ZqMFqf2s0PTDKTFuym8Plj5vKRIS5Hf_' }), publicProvider()],
)

const wagmiClient = createClient({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  provider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </WagmiConfig>)
}
