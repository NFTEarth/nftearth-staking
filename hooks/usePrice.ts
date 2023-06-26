import { useContractRead } from "wagmi";

import PriceABI from "../abis/price";
import {
  NFTE_TOKEN_ADDRESS,
  WETH_TOKEN_ADDRESS
} from "../constants";

export default function usePrice() {
  const { data: nftePriceContractReadData } = useContractRead<typeof PriceABI, 'latestRoundData', any>({
    address: NFTE_TOKEN_ADDRESS,
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  const { data: ethereumPriceContractReadData } = useContractRead<typeof PriceABI, 'latestRoundData', any>({
    // EACAggregatorProxy ETH / USD
    address: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  return { NftePrice: nftePriceContractReadData?.answer, ethereumPrice: ethereumPriceContractReadData?.answer };
}
