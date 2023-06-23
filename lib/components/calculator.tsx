"use client";

import { formatUnits, parseUnits } from "ethers/lib/utils";

import usePoolData from "@/hooks/usePoolData";
import usePrice from "@/hooks/usePrice";
import useTimeframe from "@/hooks/useTimeframe";

import { TimeFrame } from "@/types/timeframe";
import { PoolType } from "@/types/data";

import TimeframeSelector from "@/components/timeframeSelector";
import { Dispatch, useEffect, useState } from "react";
import useBalances from "@/hooks/useBalances";
import useNfteBalance from "@/hooks/useNfteBalance";
import { useAccount } from "wagmi";
import useAllStakes from "@/hooks/useAllStakes";
import { BigNumber } from "ethers";

export default function Calculator() {
  const poolData = usePoolData();
  const { NftePrice } = usePrice();
  const { timeframe } = useTimeframe();
  const { earthlingPoolStakable, roboroverPoolStakable, nfw3cPoolStakable } =
    useBalances();
  const { NfteBalance } = useNfteBalance();

  const { address } = useAccount();

  const { poolsContractRead: allStakes } = useAllStakes(address!);

  // nftePrice comes back as a big number and nfte token has 8 decimal
  // places, so we need to turn it into a formatted string via ethers then
  // turn that into a number
  const nftePriceNumber = NftePrice && +formatUnits(NftePrice, 8);

  const [nfteOwnedCount, setNfteOwnedCount] = useState<number>(0);
  const [earthlingTokenOwnedCount, setEathlingTokenOwnedCount] = useState<number>(0);
  const [roboroverTokenOwnedCount, setRoboroverTokenOwnedCount] = useState<number>(0);
  const [nfw3cTokenOwnedCount, setNfw3cTokenOwnedCount] = useState<number>(0);

  const [nfteToStakeCount, setNfteToStakeCount] = useState<number>(0);
  const [earthlingTokenToStakeCount, setEathlingTokenToStakeCount] = useState<number>(0);
  const [roboroverTokenToStakeCount, setRoboroverTokenToStakeCount] = useState<number>(0);
  const [nfw3cTokenToStakeCount, setNfw3cTokenToStakeCount] = useState<number>(0);

  interface PoolDataInterface {
    type: PoolType;
    maxStakeAmount?: number;
    ownedCount: number;
    setOwnedCount: Dispatch<number>;
    toStake: number;
    setToStakeCount: Dispatch<number>;
  }

  const PoolDataArray: PoolDataInterface[] = [
    {
      type: PoolType.NFTE,
      ownedCount: nfteOwnedCount,
      setOwnedCount: setNfteOwnedCount,
      toStake: nfteToStakeCount,
      setToStakeCount: setNfteToStakeCount,
    },
    {
      type: PoolType.EARTHLING,
      maxStakeAmount: 5000,
      ownedCount: earthlingTokenOwnedCount,
      setOwnedCount: setEathlingTokenOwnedCount,
      toStake: earthlingTokenToStakeCount,
      setToStakeCount: setEathlingTokenToStakeCount,
    },
    {
      type: PoolType.ROBOROVER,
      maxStakeAmount: 500,
      ownedCount: roboroverTokenOwnedCount,
      setOwnedCount: setRoboroverTokenOwnedCount,
      toStake: roboroverTokenToStakeCount,
      setToStakeCount: setRoboroverTokenToStakeCount,
    },
    {
      type: PoolType.NFW3C,
      maxStakeAmount: 250,
      ownedCount: nfw3cTokenOwnedCount,
      setOwnedCount: setNfw3cTokenOwnedCount,
      toStake: nfw3cTokenToStakeCount,
      setToStakeCount: setNfw3cTokenToStakeCount,
    },
  ];

  let PoolDataObject: { [key in PoolType]: PoolDataInterface };
  PoolDataObject = PoolDataArray.reduce((map, obj) => {
    map[obj.type] = obj;
    return map;
  }, {} as { [key in PoolType]: PoolDataInterface });

  const totalUnclaimed =
    allStakes.data?.reduce((sum, stake) => {
      return sum.add(stake.unclaimed);
    }, BigNumber.from(0)) || BigNumber.from(0);

  let unstakedNfte = NfteBalance || BigNumber.from(0);
  if (allStakes.data && allStakes.data[0].deposited) {
    unstakedNfte = unstakedNfte.add(allStakes.data[0].deposited);
  }

  if (allStakes.data) {
    unstakedNfte = unstakedNfte.add(totalUnclaimed);
  }

  useEffect(() => {
    setNfteToStakeCount(nfteOwnedCount);
  }, [nfteOwnedCount]);

  useEffect(() => {
    setEathlingTokenToStakeCount(
      earthlingTokenOwnedCount * PoolDataObject[PoolType.EARTHLING].maxStakeAmount!
    );
  }, [earthlingTokenOwnedCount]);

  useEffect(() => {
    setRoboroverTokenToStakeCount(
      roboroverTokenOwnedCount * PoolDataObject[PoolType.ROBOROVER].maxStakeAmount!
    );
  }, [roboroverTokenOwnedCount]);

  useEffect(() => {
    setNfw3cTokenToStakeCount(
      nfw3cTokenOwnedCount * PoolDataObject[PoolType.NFW3C].maxStakeAmount!
    );
  }, [nfw3cTokenOwnedCount]);

  useEffect(() => {
    if (unstakedNfte.isZero()) return;
    setNfteOwnedCount(Math.round(+formatUnits(unstakedNfte)));
  }, [NfteBalance]);

  useEffect(() => {
    setEathlingTokenOwnedCount(earthlingPoolStakable);
  }, [earthlingPoolStakable]);

  useEffect(() => {
    setRoboroverTokenOwnedCount(roboroverPoolStakable);
  }, [roboroverPoolStakable]);

  useEffect(() => {
    setNfw3cTokenOwnedCount(nfw3cPoolStakable);
  }, [nfw3cPoolStakable]);

  const totalStakable =
    nfteToStakeCount +
    earthlingTokenToStakeCount +
    roboroverTokenToStakeCount +
    nfw3cTokenToStakeCount;

  const hourlyRewardsTotal =
    nfteToStakeCount * poolData.poolData[PoolType.NFTE].rewardPerHour! +
    earthlingTokenToStakeCount * poolData.poolData[PoolType.EARTHLING].rewardPerHour! +
    roboroverTokenToStakeCount * poolData.poolData[PoolType.ROBOROVER].rewardPerHour! +
    nfw3cTokenToStakeCount * poolData.poolData[PoolType.NFW3C].rewardPerHour!;

  const dailyRewardsTotal = hourlyRewardsTotal * 24;
  const weeklyRewardsTotal = dailyRewardsTotal * 7;
  const monthlyRewardsTotal = dailyRewardsTotal * 30;

  let rewardsTotal;
  let timeFrameHourMultiplier: number;
  switch (timeframe) {
    case TimeFrame.Hourly:
      rewardsTotal = hourlyRewardsTotal;
      timeFrameHourMultiplier = 1;
      break;
    case TimeFrame.Daily:
      rewardsTotal = dailyRewardsTotal;
      timeFrameHourMultiplier = 24;
      break;
    case TimeFrame.Weekly:
      rewardsTotal = weeklyRewardsTotal;
      timeFrameHourMultiplier = 24 * 7;
      break;
    case TimeFrame.Monthly:
      rewardsTotal = monthlyRewardsTotal;
      timeFrameHourMultiplier = 24 * 30;
      break;
  }

  return (
    <div className="mt-4">
      <TimeframeSelector />
      <div className="overflow-auto border dark:border-zinc-700">
        <table className="w-full">
          <thead className="border-b border-zinc-200 dark:border-zinc-700">
            <tr className="flex">
              <th className="flex w-1/3 items-center p-4 text-left font-semibold tracking-wide">
                Owned Token Count
              </th>
              <th className="flex w-1/3 items-center p-4 text-left font-semibold tracking-wide">
                NFTE To Stake
              </th>
              <th className="flex w-1/3 items-center p-4 text-left font-semibold tracking-wide">
                {timeframe} NFTE Reward
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {(Object.keys(poolData.poolData) as unknown as PoolType[]).map(
              (pool) => (
                <tr key={pool} className="flex">
                  <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                    <input
                      className={`${
                        pool != PoolType.NFTE ? "w-16" : "w-28"
                      } border px-2 dark:border-zinc-500 dark:bg-zinc-800`}
                      value={PoolDataObject[pool].ownedCount}
                      onChange={(e) => {
                        const newValue = +e.target.value;
                        if (!isNaN(newValue)) {
                          PoolDataObject[pool].setOwnedCount(+e.target.value);
                        }
                      }}
                    />
                    <span>
                      {poolData.poolData[pool].name}
                      {pool != PoolType.NFTE && <>&nbsp;NFTs</>}
                    </span>{" "}
                  </td>
                  <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                    <input
                      className="w-28 border px-2 dark:border-zinc-500 dark:bg-zinc-800"
                      value={PoolDataObject[pool].toStake}
                      onChange={(e) => {
                        const newValue = +e.target.value;
                        if (!isNaN(newValue)) {
                          PoolDataObject[pool].setToStakeCount(+e.target.value);
                        }
                      }}
                    />
                    {PoolDataObject[pool].ownedCount != 0 &&
                      PoolDataObject[pool].maxStakeAmount &&
                      PoolDataObject[pool].toStake !=
                        PoolDataObject[pool].ownedCount *
                          PoolDataObject[pool].maxStakeAmount! && (
                        <button
                          onClick={() => {
                            PoolDataObject[pool].setToStakeCount(
                              PoolDataObject[pool].ownedCount *
                                PoolDataObject[pool].maxStakeAmount!
                            );
                          }}
                        >
                          MAX
                        </button>
                      )}
                    {PoolDataObject[pool].maxStakeAmount &&
                    PoolDataObject[pool].toStake != 0 &&
                    PoolDataObject[pool].toStake ==
                      PoolDataObject[pool].ownedCount *
                        PoolDataObject[pool].maxStakeAmount! ? (
                      <button
                        onClick={() => {
                          PoolDataObject[pool].setToStakeCount(0);
                        }}
                      >
                        CLEAR
                      </button>
                    ) : (
                      <button className="invisible">HIDDEN</button>
                    )}
                  </td>
                  <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                    {poolData.poolData[pool].rewardPerHour &&
                    poolData.poolData[pool].rewardPerDay &&
                    nftePriceNumber ? (
                      <>
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 4,
                        }).format(
                          poolData.poolData[pool].rewardPerHour! *
                            timeFrameHourMultiplier *
                            PoolDataObject[pool].toStake
                        )}{" "}
                        (
                        {Intl.NumberFormat("en-US", {
                          maximumFractionDigits: 4,
                          style: "currency",
                          currency: "USD",
                        }).format(
                          poolData.poolData[pool].rewardPerHour! *
                            timeFrameHourMultiplier *
                            PoolDataObject[pool].toStake *
                            nftePriceNumber!
                        )}
                        )
                      </>
                    ) : (
                      <div role="status" className="max-w-sm animate-pulse">
                        <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-36"></div>
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
            <tr className="flex">
              <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                Totals{" "}
                {totalStakable !== 0 && (
                  <span className="rounded bg-green-100 px-2.5 py-0.5 text-sm font-semibold text-green-800 dark:bg-green-200 dark:text-green-900">
                    {(
                      (dailyRewardsTotal / totalStakable) *
                      365 *
                      100
                    ).toFixed()}
                    %&nbsp;APR
                  </span>
                )}
              </td>
              <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                {Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 4,
                }).format(totalStakable) || 0}
              </td>
              <td className="flex w-1/3 flex-wrap items-center gap-2 p-4">
                {nftePriceNumber ? (
                  <>
                    {Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 4,
                    }).format(rewardsTotal)}{" "}
                    (
                    {Intl.NumberFormat("en-US", {
                      maximumFractionDigits: 4,
                      style: "currency",
                      currency: "USD",
                    }).format(
                      hourlyRewardsTotal *
                        nftePriceNumber! *
                        timeFrameHourMultiplier
                    )}
                    )
                  </>
                ) : (
                  <div role="status" className="max-w-sm animate-pulse">
                    <div className="h-4 w-16 rounded-full bg-zinc-200 dark:bg-zinc-700 md:w-36"></div>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
