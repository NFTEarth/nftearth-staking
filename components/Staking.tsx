"use client";

import {
  useAccount,
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
  useWaitForTransaction
} from "wagmi";
import {useState, useEffect, ChangeEventHandler} from "react";
import useAllStakes from "../hooks/useAllStakes";
import { ethers, BigNumber } from "ethers";
import usePrice from "../hooks/usePrice";
import useAutoConnecting from "../hooks/useAutoConnecting";
import { NfteTable, NftTable, Nfw3cTable } from "./tables";
import useAllowance from "../hooks/useAllowance";
import AllowanceButton from "./AllowanceButton";
import { formatUnits } from "ethers/lib/utils.js";
import UserStaking from "./userStaking";
import useMounted from "../hooks/useMounted";
import {CHAIN_ID, nfteContractAddresses, stakingContractAddresses} from "../constants";
import ABI from "../abis/nfteToken";
import StakingABI from "../abis/staking";

interface poolStakesData {
  poolId: BigNumber;
  tokenId: BigNumber;
  deposited: BigNumber;
  unclaimed: BigNumber;
  rewards24hr: BigNumber;
  pair: { mainTokenId: BigNumber; mainTypePoolId: BigNumber };
}

export default function Staking() {
  const { address, isConnected } = useAccount();
  const { NftePrice } = usePrice();
  const mounted = useMounted()
  const { data: allowance } = useAllowance();
  const { chain } = useNetwork();
  const [amount, setAmount] = useState('0');
  const { poolsContractReadData: allStakes } : ReturnType<typeof  useAllStakes> = useAllStakes(address);

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: nfteContractAddresses[chain?.id || CHAIN_ID],
    abi: ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, stakingContractAddresses[chain?.id || CHAIN_ID]],
  });

  const { config: depositConfig } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: stakingContractAddresses[chain?.id || CHAIN_ID],
    abi: StakingABI,
    functionName: "depositNfte",
    args: [
      ethers.utils.parseEther(amount === '' ? '0' : amount),
      stakingContractAddresses[chain?.id || CHAIN_ID]
    ],
  });

  const depositContractWrite = useContractWrite(depositConfig);

  const waitForDepositTransaction = useWaitForTransaction({
    hash: depositContractWrite.data?.hash,
    confirmations: 2,
    onSuccess() {
      depositContractWrite.reset();
    },
  });

  const handleDepositClick = () => {
    depositContractWrite.write?.();
  };

  const handleSetAmount:  ChangeEventHandler<HTMLInputElement> = (e) => {
    let value = e.target?.value;

    setAmount(value.replace(/[^0-9.]+/g, ''));
  }

  if (!mounted) {
    return null;
  }

  if (!isConnected) {
    return <h1>You must be connected to stake.</h1>;
  }

  if (!allStakes) {
    return <h1>Loading staking contract data...</h1>;
  }

  const nfteStakes: poolStakesData[] | undefined = allStakes?.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 0) {
        return true;
      }
    }
  );

  const earthlingStakes: poolStakesData[] | undefined = allStakes.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 1) {
        return true;
      }
    }
  );

  const roboroverStakes: poolStakesData[] | undefined = allStakes.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 2) {
        return true;
      }
    }
  );

  const nfw3cStakes: poolStakesData[] | undefined = allStakes.filter(
    (stake) => {
      if (stake.poolId.toNumber() === 3) {
        return true;
      }
    }
  );

  const withdrawArgs = (poolID: number, asString: boolean) => {
    if (poolID === 0) {
      const token = allStakes?.[0];
      if (token?.deposited.gt(0)) {
        return asString ? token?.deposited.toString() : token?.deposited;
      } else {
        return "";
      }
    }
    return allStakes
      ?.filter((stake) => {
        if (stake.poolId.toNumber() === poolID) {
          return true;
        }
      })
      .map((token) => {
        if (token.deposited?.gt(0)) {
          if (asString) {
            return [token.tokenId.toNumber(), token.deposited.toString()];
          } else {
            return [
              {
                tokenId: token.tokenId,
                amount: token.deposited,
              },
            ];
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const withdrawNfw3cArgs = (mainTypePoolId: number, asString: boolean) => {
    return allStakes
      ?.filter((stake) => {
        if (
          stake.poolId.toNumber() === 3 &&
          stake.pair.mainTypePoolId.toNumber() === mainTypePoolId
        ) {
          return true;
        }
      })
      .map((token) => {
        if (token.deposited?.gt(0)) {
          if (asString) {
            return [
              token.pair.mainTokenId.toNumber(),
              token.tokenId.toNumber(),
              token.deposited.toString(),
              "true",
            ];
          } else {
            return [
              {
                mainTokenId: token.pair.mainTokenId,
                nfw3cTokenId: token.tokenId,
                amount: token.deposited,
                isUncommit: true,
              },
            ];
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const claimArgs = (poolID: number, asString: boolean) => {
    if (poolID === 0) {
      const token = allStakes?.[0];
      if (token?.unclaimed.gt(0)) {
        return asString ? token.unclaimed.toString() : token.unclaimed;
      } else {
        return "";
      }
    }
    return allStakes
      ?.filter((stake) => {
        if (stake.poolId.toNumber() === poolID) {
          return true;
        }
      })
      .map((token) => {
        if (token.unclaimed?.gt(0)) {
          if (asString) {
            return token.tokenId.toNumber();
          } else {
            return;
            {
              tokenId: token.tokenId;
            }
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const claimNfw3cArgs = (mainTypePoolId: number, asString: boolean) => {
    return allStakes
      ?.filter((stake) => {
        if (
          stake.poolId.toNumber() === 3 &&
          stake.pair.mainTypePoolId.toNumber() === mainTypePoolId
        ) {
          return true;
        }
      })
      .map((token) => {
        if (token.unclaimed?.gt(0)) {
          if (asString) {
            return [
              token.pair.mainTokenId.toNumber(),
              token.tokenId.toNumber(),
              token.unclaimed.toString(),
            ];
          } else {
            return [
              {
                mainTokenId: token.pair.mainTokenId,
                tokenId: token.tokenId,
                amount: token.unclaimed,
              },
            ];
          }
        }
      })
      .filter((token) => {
        return token !== undefined;
      });
  };

  const earthlingOptions = earthlingStakes.map((data) => {
    return { label: `EARTHLING ${data.tokenId}` };
  });

  const roboroverOptions = roboroverStakes.map((data) => {
    return { label: `ROBOROVER ${data.tokenId}` };
  });

  const options = earthlingOptions.concat(roboroverOptions);

  return (
    <div>
      <div>
        <UserStaking />
      </div>

      <div className="mt-10 overflow-scroll">
        {allowance?.eq(0) ? (
          <div className="mb-10">
            <div className="mb-4">NFTE Staking Contract Allowance Approval not set:</div>

            {allowanceContractRead.isSuccess && (
              <AllowanceButton />
            )}
          </div>
        ) : (
          <div className="mb-10">
            <div className="mb-4">
              {`NFTE Staking Contract Allowance set to ${+formatUnits(allowance?.toString() || '0') >= 1e9
                ? "Unlimited"
                : formatUnits(allowance?.toString() || '0')}`}
            </div>
            {allowanceContractRead.isSuccess && (
              <AllowanceButton />
            )}
          </div>
        )}

        {allowanceContractRead.isSuccess && (
          <div className="mb-10">
            <label>Amount: <input className="border px-2 dark:border-zinc-500 dark:bg-zinc-800" value={amount} onChange={handleSetAmount}/></label>
            <button
              className="ml-2 border px-3 py-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
              disabled={depositContractWrite.isLoading || waitForDepositTransaction.isFetching || waitForDepositTransaction.isLoading}
              onClick={handleDepositClick}
            >
              Stake NFTE
            </button>
          </div>
        )}

        <h2 className="text-4xl font-extrabold">NFTE Staking Pool</h2>
        <NfteTable
          nfteStakes={nfteStakes || []}
          withdrawArgs={withdrawArgs}
          claimArgs={claimArgs}
          nftePrice={NftePrice}
        />

        <h2 className="mt-10 text-4xl font-extrabold">
          Earthling Pool
        </h2>

        <NftTable
          poolId={1}
          tokenSymbol="EARTHLING"
          poolStakes={earthlingStakes}
          withdrawArgs={withdrawArgs}
          claimArgs={claimArgs}
          nftePrice={NftePrice}
          withdrawFunctionID="24"
          claimFunctionID="8"
          depositFunctionID="12"
        />

        <h2 className="mt-10 text-4xl font-extrabold">
          RoboRover Pool
        </h2>

        <NftTable
          poolId={2}
          tokenSymbol={"ROBOROVER"}
          poolStakes={roboroverStakes || []}
          withdrawArgs={withdrawArgs}
          claimArgs={claimArgs}
          nftePrice={NftePrice}
          withdrawFunctionID="25"
          claimFunctionID="9"
          depositFunctionID="13"
        />

        <h2 className="mt-10 text-4xl font-extrabold">
          Non-Fungible Web3 Citizen Pool
        </h2>

        <Nfw3cTable
          poolStakes={nfw3cStakes || []}
          withdrawArgs={withdrawNfw3cArgs}
          claimArgs={claimNfw3cArgs}
          nftePrice={NftePrice}
          pairOptions={options}
        />
      </div>
    </div>
  );
}
