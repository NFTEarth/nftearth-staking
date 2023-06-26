"use client";

import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import useAllStakes from "../hooks/useAllStakes";
import { ethers, BigNumber } from "ethers";
import usePrice from "../hooks/usePrice";
import useAutoConnecting from "../hooks/useAutoConnecting";
import { NfteTable, NftTable, Nfw3cTable } from "./tables";
import useAllowance from "../hooks/useAllowance";
import AllowanceButton from "./AllowanceButton";
import { formatUnits } from "ethers/lib/utils.js";
import UserStaking from "./userStaking";

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
  const autoConnectinng = useAutoConnecting();
  const allowance = useAllowance();
  const [statsAddress, setStatsAddress] = useState<string>("");
  useEffect(() => {
    if (address) {
      setStatsAddress(address);
    }
  }, [address]);

  const { poolsContractReadData: allStakes } = useAllStakes(statsAddress);

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
        return asString ? token.deposited.toString() : token.deposited;
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
        {allowance?.data?.eq(0) ? (
          <>
            <div>NFTE Staking Contract Allowance Approval not set:</div>
            <AllowanceButton />
          </>
        ) : (
          <div>
            NFTE Staking Contract Allowance set to{" "}
            {+formatUnits(allowance.data?.toString()!) >= 1e9
              ? "Unlimited"
              : formatUnits(allowance.data?.toString()!)}
            <AllowanceButton />
          </div>
        )}

        <h2 className="text-4xl font-extrabold">NFTE Staking Pool</h2>
        <NfteTable
          nfteStakes={nfteStakes}
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
          poolStakes={roboroverStakes}
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
          poolStakes={nfw3cStakes}
          withdrawArgs={withdrawNfw3cArgs}
          claimArgs={claimNfw3cArgs}
          nftePrice={NftePrice}
          pairOptions={options}
        />
      </div>
    </div>
  );
}
