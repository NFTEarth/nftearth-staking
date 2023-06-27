"use client";

import { WagmiConfig, createClient, configureChains } from "wagmi";
import { arbitrum } from "wagmi/chains";

import { ConnectKitProvider, getDefaultClient } from "connectkit";
import { alchemyProvider } from "wagmi/providers/alchemy";
// import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
import { publicProvider } from "wagmi/providers/public";

const { provider, chains } = configureChains(
  [arbitrum],
  [
    publicProvider({ priority: 2 }),
    alchemyProvider({
      priority: 1,
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY as string,
    }),
    // jsonRpcProvider({
    //   priority: 1,
    //   rpc: (chain) => {
    //     return {
    //       http: `https://staking.nftearth.exchange${
    //         chain.id === arbitrum.id ? "/v1/arbitrum" : "/v1/goerli"
    //       }`,
    //     };
    //   },
    // })
  ]
)

const client = createClient(
  getDefaultClient({
    appName: "NFTEarth",
    alchemyId: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
    chains: chains,
    autoConnect: true,
    provider: provider,
  })
);

export default function Provider({ children }: React.PropsWithChildren<{}>) {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
}