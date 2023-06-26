import { useContractRead } from "wagmi";

import PriceABI from "../abis/price";
import {NFTE_TOKEN_ADDRESS} from "../constants";

export default function usePrice() {
  const { data: nftePriceContractReadData } = useContractRead<typeof PriceABI, 'latestRoundData', any>({
    address: NFTE_TOKEN_ADDRESS,
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  const { data: ethereumPriceContractReadData } = useContractRead<typeof PriceABI, 'latestRoundData', any>({
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  return { NftePrice: nftePriceContractReadData?.answer, ethereumPrice: ethereumPriceContractReadData?.answer };
}
