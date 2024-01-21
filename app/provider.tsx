"use client";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { polygon } from "wagmi/chains";

import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";
import {MetaMaskConnector} from "@wagmi/connectors/metaMask";
import {CoinbaseWalletConnector} from "@wagmi/connectors/coinbaseWallet";
import {WalletConnectConnector} from "@wagmi/connectors/walletConnect";
import {InjectedConnector} from "@wagmi/connectors/injected";

const ALCHEMY_RPC: Record<number, string> = {
  1: 'eth-mainnet',
  10: 'opt-mainnet',
  137: 'polygon-mainnet',
  42161: 'arb-mainnet'
}

const { provider, chains } = configureChains(
  [polygon],
  [
    publicProvider({ priority: 2 }),
    alchemyProvider({
      priority: 1,
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    })
  ]
)

const client = createClient(
  getDefaultClient({
    appName: "NFTEarth",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chains: chains,
    autoConnect: false,
    provider: provider,
    enableWebSocketProvider: false,
    connectors: [
      new MetaMaskConnector({ chains }),
      new CoinbaseWalletConnector({
        chains,
        options: {
          appName: 'NFTEarth',
        },
      }),
      new WalletConnectConnector({
        chains,
        options: {
          projectId: '43f64cebd8e57e82652232682308e822',
        },
      }),
      new InjectedConnector({
        chains,
        options: {
          name: 'Injected',
          shimDisconnect: true,
        },
      }),
    ],
  })
);

export default function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}