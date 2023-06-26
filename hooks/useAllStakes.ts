import { useContractRead, useNetwork, useEnsAddress } from "wagmi";
import StakingABI from "../abis/staking";
import { BigNumber } from "ethers";
import {
  stakingContractAddresses
} from "../constants";

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

  const { data: poolsContractReadData, isError, error } = useContractRead<typeof StakingABI, 'getAllStakes', any>({
    enabled: addressOrEns !== undefined && addressOrEns !== "",
    address: stakingContractAddresses[chain?.id || 42161],
    abi: StakingABI,
    functionName: "getAllStakes",
    watch: true,
    chainId: chain?.id || 42161,
    args: [data as `0x${string}`],
  });

  const nfteStakes: poolStakesData[] | undefined =
    poolsContractReadData?.filter((stake: any) => {
      if (stake.poolId.toNumber() === 0) {
        return true;
      }
    });

  const earthlingStakes: poolStakesData[] | undefined =
    poolsContractReadData?.filter((stake: any) => {
      if (stake.poolId.toNumber() === 1) {
        return true;
      }
    });

  const roboroverStakes: poolStakesData[] | undefined =
    poolsContractReadData?.filter((stake: any) => {
      if (stake.poolId.toNumber() === 2) {
        return true;
      }
    });

  const nfw3cStakes: poolStakesData[] | undefined =
    poolsContractReadData?.filter((stake: any) => {
      if (stake.poolId.toNumber() === 3) {
        return true;
      }
    });

  return {
    isError,
    error,
    poolsContractReadData,
    nfteStakes,
    earthlingStakes,
    roboroverStakes,
    nfw3cStakes,
  };
}

export default useAllStakes;
