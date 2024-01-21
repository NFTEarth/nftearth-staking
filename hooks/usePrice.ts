import { useContractRead } from "wagmi";

import PriceABI from "../abis/price";
import {useEffect, useState} from "react";
import {BigNumber, ethers} from "ethers";

export default function usePrice() {
  const [nftePrice, setNftePrice] = useState<BigNumber>();

  useEffect(() => {
    fetch(`/api/price`).then(async (res) => {
      const data = await res.json();

      setNftePrice(ethers.utils.parseUnits(data?.price?.toFixed(8) || '0', 8))
    })
  }, [])

  const { data: ethereumPriceContractReadData } = useContractRead<typeof PriceABI, 'latestRoundData', any>({
    // EACAggregatorProxy ETH / USD
    address: "0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 137,
  });

  return { NftePrice: nftePrice, ethereumPrice: ethereumPriceContractReadData?.answer };
}
