import { useState, useEffect } from "react";
import { useContractRead } from "wagmi";

import PriceABI from "@/abis/price";
import { BigNumber } from "ethers";

export default function usePrice() {
  const [nftePrice, setNftePrice] = useState<BigNumber>();

  const nftePriceContractRead = useContractRead({
    address: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  useEffect(() => {
    if (
      nftePriceContractRead &&
      nftePriceContractRead.data &&
      nftePriceContractRead.isSuccess
    ) {
      setNftePrice(nftePriceContractRead.data.answer);
    }
  }, [
    nftePriceContractRead.isSuccess,
    nftePriceContractRead.isRefetching,
    nftePriceContractRead.data,
  ]);

  const [ethereumPrice, setEthereumPrice] = useState<BigNumber>();

  const ethereumPriceContractRead = useContractRead({
    address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  useEffect(() => {
    if (
      ethereumPriceContractRead &&
      ethereumPriceContractRead.data &&
      ethereumPriceContractRead.isSuccess
    ) {
      setEthereumPrice(ethereumPriceContractRead.data.answer);
    }
  }, [
    ethereumPriceContractRead.isSuccess,
    ethereumPriceContractRead.isRefetching,
    ethereumPriceContractRead.data,
  ]);

  return { nftePrice, ethereumPrice };
}
