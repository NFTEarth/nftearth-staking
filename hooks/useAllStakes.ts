import {useContractRead, useNetwork} from "wagmi";
import StakingABI from "../abis/staking";
import { BigNumber } from "ethers";
import useEnsResolver from './useENSResolver'
import {
  CHAIN_ID,
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

type useAllStakesReturn = {
  error: Error | null
  addressError: Error | null
  poolsContractReadData: poolStakesData[],
  nfteStakes: poolStakesData[],
  earthlingStakes: poolStakesData[],
  roboroverStakes: poolStakesData[],
  nfw3cStakes: poolStakesData[],
}

const useAllStakes = (addressOrEns?: `0x${string}`) : useAllStakesReturn => {
  const { chain } = useNetwork();
  const { address, error: addressError } = useEnsResolver(addressOrEns, CHAIN_ID);

  const isNonEmpty = !!addressOrEns && addressOrEns !== "0x" && !addressError;

  const { data: poolsContractReadData = [], error } = useContractRead<typeof StakingABI, 'getAllStakes', poolStakesData[]>({
    enabled: isNonEmpty,
    address: stakingContractAddresses[chain?.id || 42161],
    abi: StakingABI,
    functionName: "getAllStakes",
    watch: true,
    chainId: chain?.id || 42161,
    args: [address as `0x${string}`],
  });

  const nfteStakes: poolStakesData[] =
    poolsContractReadData.filter((stake) => {
      if (stake.poolId.toNumber() === 0) {
        return true;
      }
    });

  const earthlingStakes: poolStakesData[] =
    poolsContractReadData.filter((stake) => {
      if (stake.poolId.toNumber() === 1) {
        return true;
      }
    });

  const roboroverStakes: poolStakesData[] =
    poolsContractReadData.filter((stake) => {
      if (stake.poolId.toNumber() === 2) {
        return true;
      }
    });

  const nfw3cStakes: poolStakesData[] =
    poolsContractReadData.filter((stake) => {
      if (stake.poolId.toNumber() === 3) {
        return true;
      }
    });

  return {
    error,
    addressError,
    poolsContractReadData,
    nfteStakes,
    earthlingStakes,
    roboroverStakes,
    nfw3cStakes,
  };
}

export default useAllStakes;
