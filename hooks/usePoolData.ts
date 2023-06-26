import { useContractRead, useNetwork } from "wagmi";
import StakingABI from "../abis/staking";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils.js";
import {Pool, PoolData} from "../types/data";
import {
  CHAIN_ID,
  stakingContractAddresses
} from "../constants";

function calculateAPR(perDayPool: number, stakedAmount: number): number {
  return (perDayPool / stakedAmount) * 365 * 100;
}

function usePoolData(): {
  initialLoad: boolean;
  poolData: PoolData;
} {
  const { chain } = useNetwork();

  const { data: poolsContractReadData, isSuccess, isRefetching } = useContractRead<typeof StakingABI, 'getPoolsUI', Pool[]>({
    address: stakingContractAddresses[chain?.id || CHAIN_ID],
    abi: StakingABI,
    functionName: "getPoolsUI",
    watch: true,
    chainId: chain?.id || 42161,
  });

  const [initialLoad, setInitialLoad] = useState(false);
  const [poolData, setPoolData] = useState<PoolData>({
    0: {
      name: "NFTE",
    },
    1: {
      name: "Earthling",
    },
    2: {
      name: "RoboRover",
    },
    3: {
      name: "Non-Fungible Web3 Citizen",
    },
  });

  useEffect(() => {
    if (
      !poolsContractReadData ||
      poolsContractReadData.length !== 4
    ) {
      return;
    }
    if (isSuccess) {
      setInitialLoad(true);

      const nfteRewardPoolPerHour = +formatUnits(
        poolsContractReadData?.[0]?.currentTimeRange?.rewardsPerHour || 0
      );

      const nfteRewardPoolPerDay = nfteRewardPoolPerHour * 24;

      const nfteRewardPerHour =
        +formatUnits(
          poolsContractReadData?.[0].currentTimeRange?.rewardsPerHour || 0
        ) / +formatUnits(poolsContractReadData?.[0].stakedAmount || 0);

      const nfteRewardPerDay = nfteRewardPerHour * 24;

      const nfteStakedAmount = +formatUnits(
        poolsContractReadData?.[0].stakedAmount || 0
      );
      const nftePoolAPR = calculateAPR(nfteRewardPoolPerDay, nfteStakedAmount);

      const earthlingRewardPoolPerHour = +formatUnits(
        poolsContractReadData?.[1]?.currentTimeRange?.rewardsPerHour || 0
      );

      const earthlingRewardPoolPerDay = earthlingRewardPoolPerHour * 24;

      const earthlingRewardPerHour =
        +formatUnits(
          poolsContractReadData?.[1].currentTimeRange?.rewardsPerHour || 0
        ) / +formatUnits(poolsContractReadData?.[1]?.stakedAmount || 0);

      const earthlingRewardPerDay = earthlingRewardPerHour * 24;

      const earthlingStakedAmount = +formatUnits(
        poolsContractReadData[1].stakedAmount
      );
      const earthlingPoolAPR = calculateAPR(earthlingRewardPoolPerDay, earthlingStakedAmount);

      const roboroverRewardPoolPerHour = +formatUnits(
        poolsContractReadData?.[2].currentTimeRange?.rewardsPerHour
      );

      const roboroverRewardPoolPerDay = roboroverRewardPoolPerHour * 24;

      const roboroverRewardPerHour =
        +formatUnits(
          poolsContractReadData?.[2].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractReadData?.[2].stakedAmount);

      const roboroverRewardPerDay = roboroverRewardPerHour * 24;

      const roboroverStakedAmount = +formatUnits(
        poolsContractReadData?.[2].stakedAmount
      );
      const roboroverPoolAPR = calculateAPR(roboroverRewardPoolPerDay, roboroverStakedAmount);

      const nfw3cRewardPoolPerHour = +formatUnits(
        poolsContractReadData?.[3].currentTimeRange.rewardsPerHour
      );

      const nfw3cRewardPoolPerDay = nfw3cRewardPoolPerHour * 24;

      const nfw3cRewardPerHour =
        +formatUnits(
          poolsContractReadData?.[3].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractReadData?.[3].stakedAmount);

      const nfw3cRewardPerDay = nfw3cRewardPerHour * 24;

      const nfw3cStakedAmount = +formatUnits(
        poolsContractReadData?.[3].stakedAmount
      );
      const nfw3cPoolAPR = calculateAPR(nfw3cRewardPoolPerDay, nfw3cStakedAmount);

      setPoolData({
        0: {
          name: "NFTE",
          apr: nftePoolAPR,
          stakedAmount: nfteStakedAmount,
          rewardPoolPerHour: nfteRewardPoolPerHour,
          rewardPoolPerDay: nfteRewardPoolPerDay,
          rewardPerHour: nfteRewardPerHour,
          rewardPerDay: nfteRewardPerDay,
        },
        1: {
          name: "Earthling",
          apr: earthlingPoolAPR,
          stakedAmount: earthlingStakedAmount,
          rewardPoolPerHour: earthlingRewardPoolPerHour,
          rewardPoolPerDay: earthlingRewardPoolPerDay,
          rewardPerHour: earthlingRewardPerHour,
          rewardPerDay: earthlingRewardPerDay,
        },
        2: {
          name: "RoboRover",
          apr: roboroverPoolAPR,
          stakedAmount: roboroverStakedAmount,
          rewardPoolPerHour: roboroverRewardPoolPerHour,
          rewardPoolPerDay: roboroverRewardPoolPerDay,
          rewardPerHour: roboroverRewardPerHour,
          rewardPerDay: roboroverRewardPerDay,
        },
        3: {
          name: "Non-Fungible Web3 Citizen",
          apr: nfw3cPoolAPR,
          stakedAmount: nfw3cStakedAmount,
          rewardPoolPerHour: nfw3cRewardPoolPerHour,
          rewardPoolPerDay: nfw3cRewardPoolPerDay,
          rewardPerHour: nfw3cRewardPerHour,
          rewardPerDay: nfw3cRewardPerDay,
        },
      });
    }
  }, [
    isSuccess,
    isRefetching,
    poolsContractReadData,
  ]);

  return { initialLoad, poolData };
}

export default usePoolData;
