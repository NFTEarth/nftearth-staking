import { useContractRead } from "wagmi";

import PriceABI from "../abis/price";
import {useEffect, useState} from "react";
import {BigNumber, ethers} from "ethers";

export default function usePrice() {
  const [nftePrice, setNftePrice] = useState<BigNumber>();

  useEffect(() => {
    fetch(`/api/price`).then(async (res) => {
      const data = await res.json();

      setNftePrice(ethers.utils.parseUnits(data.price.toFixed(8), 8))
    })
  }, [])

  const { data: ethereumPriceContractReadData } = useContractRead<typeof PriceABI, 'latestRoundData', any>({
    // EACAggregatorProxy ETH / USD
    address: "0x639Fe6ab55C921f74e7fac1ee960C0B6293ba612",
    abi: PriceABI,
    functionName: "latestRoundData",
    watch: true,
    chainId: 42161,
  });

  return { NftePrice: nftePrice, ethereumPrice: ethereumPriceContractReadData?.answer };
}
