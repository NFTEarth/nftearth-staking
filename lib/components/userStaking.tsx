"use client";

import { useEffect, useState } from "react";
import {
  useAccount,
  useNetwork,
  usePrepareContractWrite,
  useContractWrite,
  Chain,
} from "wagmi";

import useAllStakes, { poolStakesData } from "@/hooks/useAllStakes";
import { formatUnits } from "ethers/lib/utils.js";
import usePrice from "@/hooks/usePrice";
import ABI from "@/abis/staking";
import { Map } from "@/types/map";
import { BigNumber } from "ethers";

const stakingContractAddresses: Map = {
  1: "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9",
  5: "0xeF37717B1807a253c6D140Aca0141404D23c26D4",
} as const;

function ClaimAll({
  chain,
  nfteStakes,
  earthlingStakes,
  roboroverStakes,
  nfw3cStakes,
}: {
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
  nfteStakes: poolStakesData[] | undefined;
  earthlingStakes: poolStakesData[] | undefined;
  roboroverStakes: poolStakesData[] | undefined;
  nfw3cStakes: poolStakesData[] | undefined;
}) {
  const nfteClaimPrepareContractWrite = usePrepareContractWrite({
    enabled:
      nfteStakes &&
      nfteStakes.length !== 0 &&
      !nfteStakes[0].unclaimed.isZero(),
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "claimSelfNfte",
  });

  const nfteClaimContractWrite = useContractWrite(
    nfteClaimPrepareContractWrite.config
  );

  const args = earthlingStakes
    ?.map((token) => {
      if (token.unclaimed?.gt(0)) {
        return token.tokenId.toNumber();
      }
    })
    .filter((token) => {
      return token !== undefined;
    });

  const earthlingUnclaimed =
    earthlingStakes?.reduce((sum, stake) => {
      return sum + +formatUnits(stake.unclaimed);
    }, 0) || 0;

  const earthlingPrepareContractWrite = usePrepareContractWrite({
    enabled: earthlingStakes && earthlingStakes.length > 0 && earthlingUnclaimed > 0,
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "claimSelfEARTHLING",
    args: args && ([args] as any),
  });

  const earthlingContractWrite = useContractWrite(earthlingPrepareContractWrite.config);

  const roboroverArgs = roboroverStakes
    ?.map((token) => {
      if (token.unclaimed?.gt(0)) {
        return token.tokenId.toNumber();
      }
    })
    .filter((token) => {
      return token !== undefined;
    });

  const roboroverPrepareContractWrite = usePrepareContractWrite({
    enabled: roboroverStakes && roboroverStakes.length > 0,
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "claimSelfROBOROVER",
    args: [roboroverArgs as any],
  });

  const roboroverContractWrite = useContractWrite(roboroverPrepareContractWrite.config);

  interface nfw3cData {
    mainTokenId: BigNumber;
    nfw3cTokenId: BigNumber;
  }

  let nfw3cBaycArgs: nfw3cData[] = [];
  let nfw3cMaycArgs: nfw3cData[] = [];

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 1) {
        nfw3cBaycArgs.push({
          mainTokenId: stake.pair.mainTokenId,
          nfw3cTokenId: stake.tokenId,
        });
      }
    }
  }

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 2) {
        nfw3cMaycArgs.push({
          mainTokenId: stake.pair.mainTokenId,
          nfw3cTokenId: stake.tokenId,
        });
      }
    }
  }

  const nfw3cPrepareContractWrite = usePrepareContractWrite({
    enabled: nfw3cBaycArgs.length > 0 || nfw3cMaycArgs.length > 0,
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "claimSelfNFW3C",
    args: [nfw3cBaycArgs, nfw3cMaycArgs],
  });

  const nfw3cContractWrite = useContractWrite(nfw3cPrepareContractWrite.config);
  return (
    <div>
      <button
        onClick={() => {
          if (nfteStakes?.[0]?.unclaimed.gt(0)) {
            nfteClaimContractWrite.write?.();
          }
          earthlingContractWrite.write?.();
          roboroverContractWrite.write?.();
          nfw3cContractWrite.write?.();
        }}
        className="border px-2 hover:border-zinc-500 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:border-zinc-300"
      >
        Claim All
      </button>
    </div>
  );
}

function WithdrawAll({
  chain,
  nfteStakes,
  earthlingStakes,
  roboroverStakes,
  nfw3cStakes,
}: {
  chain: (Chain & { unsupported?: boolean | undefined }) | undefined;
  nfteStakes: poolStakesData[] | undefined;
  earthlingStakes: poolStakesData[] | undefined;
  roboroverStakes: poolStakesData[] | undefined;
  nfw3cStakes: poolStakesData[] | undefined;
}) {
  const nfteWithdrawPrepareContractWrite = usePrepareContractWrite({
    enabled: !nfteStakes?.[0]?.deposited.isZero(),
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "withdrawSelfNfte",
    args: nfteStakes?.[0]?.deposited && [nfteStakes[0].deposited],
  });

  const nfteWithdrawContractWrite = useContractWrite(
    nfteWithdrawPrepareContractWrite.config
  );

  interface withdrawData {
    tokenId: BigNumber;
    amount: BigNumber;
  }

  let earthlingWithdrawArgs: withdrawData[] = [];

  if (earthlingStakes) {
    for (let i = 0; i < earthlingStakes.length; i++) {
      const stake = earthlingStakes[i];
      if (stake.deposited.gt(0)) {
        earthlingWithdrawArgs.push({
          tokenId: stake.tokenId,
          amount: stake.deposited,
        });
      }
    }
  }

  const earthlingWithdrawPrepareContractWrite = usePrepareContractWrite({
    enabled: earthlingStakes && earthlingStakes.length > 0,
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "withdrawSelfEARTHLING",
    args: earthlingWithdrawArgs && ([earthlingWithdrawArgs] as any),
  });

  const earthlingWithdrawContractWrite = useContractWrite(
    earthlingWithdrawPrepareContractWrite.config
  );

  let roboroverWithdrawArgs: withdrawData[] = [];

  if (roboroverStakes) {
    for (let i = 0; i < roboroverStakes.length; i++) {
      const stake = roboroverStakes[i];
      if (stake.deposited.gt(0)) {
        roboroverWithdrawArgs.push({
          tokenId: stake.tokenId,
          amount: stake.deposited,
        });
      }
    }
  }

  const roboroverWithdrawPrepareContractWrite = usePrepareContractWrite({
    enabled: roboroverStakes && roboroverStakes.length > 0,
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "withdrawSelfROBOROVER",
    args: roboroverWithdrawArgs && ([roboroverWithdrawArgs] as any),
  });

  const roboroverWithdrawContractWrite = useContractWrite(
    roboroverWithdrawPrepareContractWrite.config
  );

  interface nfw3cData {
    mainTokenId: number;
    nfw3cTokenId: number;
    amount: BigNumber;
    isUncommit: boolean;
  }

  let nfw3cBaycArgs: nfw3cData[] = [];
  let nfw3cMaycArgs: nfw3cData[] = [];

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 1) {
        nfw3cBaycArgs.push({
          mainTokenId: stake.pair.mainTokenId.toNumber(),
          nfw3cTokenId: stake.tokenId.toNumber(),
          amount: stake.deposited,
          isUncommit: true,
        });
      }
    }
  }

  if (nfw3cStakes) {
    for (let i = 0; i < nfw3cStakes.length; i++) {
      const stake = nfw3cStakes[i];
      if (stake.unclaimed.gt(0) && stake.pair.mainTypePoolId.toNumber() === 2) {
        nfw3cMaycArgs.push({
          mainTokenId: stake.pair.mainTokenId.toNumber(),
          nfw3cTokenId: stake.tokenId.toNumber(),
          amount: stake.deposited,
          isUncommit: true,
        });
      }
    }
  }

  const nfw3cPrepareContractWrite = usePrepareContractWrite({
    enabled: nfw3cBaycArgs.length > 0 || nfw3cMaycArgs.length > 0,
    address: stakingContractAddresses[chain?.id || 1],
    abi: ABI,
    functionName: "withdrawNFW3C",
    args: [nfw3cBaycArgs, nfw3cMaycArgs],
  });

  const nfw3cContractWrite = useContractWrite(nfw3cPrepareContractWrite.config);
  return (
    <div>
      <button
        onClick={() => {
          if (nfteStakes?.[0]?.unclaimed.gt(0)) {
            nfteWithdrawContractWrite.write?.();
          }
          earthlingWithdrawContractWrite.write?.();
          roboroverWithdrawContractWrite.write?.();
          nfw3cContractWrite.write?.();
        }}
        className="border px-2 hover:border-zinc-500 dark:border-zinc-500 dark:bg-zinc-800 dark:hover:border-zinc-300"
      >
        Withdraw All
      </button>
    </div>
  );
}

export default function UserStaking() {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { nftePrice } = usePrice();
  const [statsAddress, setStatsAddress] = useState<string>("");
  useEffect(() => {
    if (address) {
      setStatsAddress(address);
    }
  }, [address]);

  const {
    poolsContractRead: allStakes,
    nfteStakes,
    earthlingStakes,
    roboroverStakes,
    nfw3cStakes,
  } = useAllStakes(statsAddress!);

  const totalStaked = allStakes.data?.reduce((sum, stake) => {
    return sum + +formatUnits(stake.deposited);
  }, 0);

  const totalUnclaimed = allStakes.data?.reduce((sum, stake) => {
    return sum + +formatUnits(stake.unclaimed);
  }, 0);

  const nftePriceNumber = nftePrice && +formatUnits(nftePrice, 8);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <div
          className={`block border border-zinc-200 bg-white p-4
          dark:border-zinc-700 dark:bg-zinc-900 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            Address or ENS:
          </h5>
          <input
            spellCheck="false"
            className="w-full border px-1 text-xs dark:border-zinc-500 dark:bg-zinc-800"
            value={statsAddress}
            placeholder={"enter address or ens name"}
            onChange={(e) => {
              setStatsAddress(e.target.value);
            }}
          />
          {statsAddress &&
            allStakes.isError &&
            allStakes.error &&
            "Invalid address or ENS name"}
        </div>
        <div
          className={`block border border-zinc-200 bg-white p-4
          dark:border-zinc-700 dark:bg-zinc-900 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            Total Staked
          </h5>
          <div className="flex flex-col flex-wrap gap-2 text-zinc-700 dark:text-zinc-400">
            {totalStaked ? (
              <>
                <div>
                  {Intl.NumberFormat("en-US", {
                    maximumFractionDigits: 4,
                  }).format(totalStaked)}
                  {totalStaked && nftePriceNumber && (
                    <>
                      {" "}
                      (
                      {Intl.NumberFormat("en-US", {
                        maximumFractionDigits: 2,
                        style: "currency",
                        currency: "USD",
                        notation: "compact",
                        compactDisplay: "short",
                      }).format(totalStaked * nftePriceNumber)}
                      )
                    </>
                  )}
                </div>
                {address === statsAddress &&
                  process.env.NEXT_PUBLIC_ENABLE_STAKE === "TRUE" && (
                    <WithdrawAll
                      chain={chain}
                      nfteStakes={nfteStakes}
                      earthlingStakes={earthlingStakes}
                      roboroverStakes={roboroverStakes}
                      nfw3cStakes={nfw3cStakes}
                    />
                  )}
              </>
            ) : (
              <>{earthlingStakes && <>0</>}</>
            )}
          </div>
        </div>
        <div
          className={`block border border-zinc-200 bg-white p-4
          dark:border-zinc-700 dark:bg-zinc-900 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-xl font-bold tracking-tight">
            Unclaimed Rewards
          </h5>
          <div className="flex flex-col flex-wrap gap-2 text-zinc-700 dark:text-zinc-400">
            {totalUnclaimed ? (
              <>
                {Intl.NumberFormat("en-US", {
                  maximumFractionDigits: 4,
                }).format(totalUnclaimed)}
                {totalUnclaimed && nftePriceNumber && (
                  <>
                    {" "}
                    (
                    {Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                      notation: "compact",
                      compactDisplay: "short",
                    }).format(totalUnclaimed * nftePriceNumber)}
                    )
                  </>
                )}
                {address === statsAddress &&
                  process.env.NEXT_PUBLIC_ENABLE_STAKE === "TRUE" && (
                    <ClaimAll
                      chain={chain}
                      nfteStakes={nfteStakes}
                      earthlingStakes={earthlingStakes}
                      roboroverStakes={roboroverStakes}
                      nfw3cStakes={nfw3cStakes}
                    />
                  )}
              </>
            ) : (
              <>{earthlingStakes && <>0</>}</>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
