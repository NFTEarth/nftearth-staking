import { useContractRead, useNetwork } from "wagmi";
import StakingABI from "@/abis/staking";
import { useEffect, useState } from "react";
import { formatUnits } from "ethers/lib/utils.js";
import { Map } from "@/types/map";
import { PoolData } from "@/types/data";

const stakingContractAddresses: Map = {
  42161: "0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe",
  
} as const;

function calculateAPR(perDayPool: number, stakedAmount: number): number {
  return (perDayPool / stakedAmount) * 365 * 100;
}

function usePoolData(): {
  initialLoad: boolean;
  poolData: PoolData;
} {
  const { chain } = useNetwork();

  const poolsContractRead = useContractRead({
    address: stakingContractAddresses[chain?.id || 42161],
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
      !poolsContractRead ||
      !poolsContractRead.data ||
      poolsContractRead.data.length !== 4
    ) {
      return;
    }
    if (poolsContractRead.isSuccess) {
      setInitialLoad(true);

      const nfteRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[0].currentTimeRange.rewardsPerHour
      );

      const nfteRewardPoolPerDay = nfteRewardPoolPerHour * 24;

      const nfteRewardPerHour =
        +formatUnits(
          poolsContractRead.data[0].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[0].stakedAmount);

      const nfteRewardPerDay = nfteRewardPerHour * 24;

      const nfteStakedAmount = +formatUnits(
        poolsContractRead.data[0].stakedAmount
      );
      const nftePoolAPR = calculateAPR(nfteRewardPoolPerDay, nfteStakedAmount);

      const earthlingRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[1].currentTimeRange.rewardsPerHour
      );

      const earthlingRewardPoolPerDay = earthlingRewardPoolPerHour * 24;

      const earthlingRewardPerHour =
        +formatUnits(
          poolsContractRead.data[1].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[1].stakedAmount);

      const earthlingRewardPerDay = earthlingRewardPerHour * 24;

      const earthlingStakedAmount = +formatUnits(
        poolsContractRead.data[1].stakedAmount
      );
      const earthlingPoolAPR = calculateAPR(earthlingRewardPoolPerDay, earthlingStakedAmount);

      const roboroverRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[2].currentTimeRange.rewardsPerHour
      );

      const roboroverRewardPoolPerDay = roboroverRewardPoolPerHour * 24;

      const roboroverRewardPerHour =
        +formatUnits(
          poolsContractRead.data[2].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[2].stakedAmount);

      const roboroverRewardPerDay = roboroverRewardPerHour * 24;

      const roboroverStakedAmount = +formatUnits(
        poolsContractRead.data[2].stakedAmount
      );
      const roboroverPoolAPR = calculateAPR(roboroverRewardPoolPerDay, roboroverStakedAmount);

      const nfw3cRewardPoolPerHour = +formatUnits(
        poolsContractRead.data[3].currentTimeRange.rewardsPerHour
      );

      const nfw3cRewardPoolPerDay = nfw3cRewardPoolPerHour * 24;

      const nfw3cRewardPerHour =
        +formatUnits(
          poolsContractRead.data[3].currentTimeRange.rewardsPerHour
        ) / +formatUnits(poolsContractRead.data[3].stakedAmount);

      const nfw3cRewardPerDay = nfw3cRewardPerHour * 24;

      const nfw3cStakedAmount = +formatUnits(
        poolsContractRead.data[3].stakedAmount
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
    poolsContractRead.isSuccess,
    poolsContractRead.isRefetching,
    poolsContractRead.data,
  ]);

  return { initialLoad, poolData };
}

export default usePoolData;
