import { useContractRead, useNetwork, useEnsAddress } from "wagmi";
import StakingABI from "@/abis/staking";
import { Map } from "@/types/map";
import { BigNumber } from "ethers";

const stakingContractAddresses: Map = {
  42161: "0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe",
} as const;

export interface poolStakesData {
  poolId: BigNumber;
  tokenId: BigNumber;
  deposited: BigNumber;
  unclaimed: BigNumber;
  rewards24hr: BigNumber;
  pair: { mainTokenId: BigNumber; mainTypePoolId: BigNumber };
}

function useAllStakes(addressOrEns: string) {
  const { chain } = useNetwork();
  const { data } = useEnsAddress({
    name: addressOrEns,
  });

  const poolsContractRead = useContractRead({
    enabled: addressOrEns !== undefined && addressOrEns !== "",
    address: stakingContractAddresses[chain?.id || 42161],
    abi: StakingABI,
    functionName: "getAllStakes",
    watch: true,
    chainId: chain?.id || 42161,
    args: [data as `0x${string}`],
  });

  const nfteStakes: poolStakesData[] | undefined =
    poolsContractRead.data?.filter((stake) => {
      if (stake.poolId.toNumber() === 0) {
        return true;
      }
    });

  const earthlingStakes: poolStakesData[] | undefined =
    poolsContractRead.data?.filter((stake) => {
      if (stake.poolId.toNumber() === 1) {
        return true;
      }
    });

  const roboroverStakes: poolStakesData[] | undefined =
    poolsContractRead.data?.filter((stake) => {
      if (stake.poolId.toNumber() === 2) {
        return true;
      }
    });

  const nfw3cStakes: poolStakesData[] | undefined =
    poolsContractRead.data?.filter((stake) => {
      if (stake.poolId.toNumber() === 3) {
        return true;
      }
    });

  return {
    poolsContractRead,
    nfteStakes,
    earthlingStakes,
    roboroverStakes,
    nfw3cStakes,
  };
}

export default useAllStakes;
