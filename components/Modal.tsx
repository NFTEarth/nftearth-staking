"use client";

import ABI from "../abis/staking";
import useAllStakes, { poolStakesData } from "../hooks/useAllStakes";
import { Map } from "../types/map";
import { CheckCircleIcon, ClockIcon, WalletIcon, XCircleIcon,} from "@heroicons/react/24/solid";
import { BigNumber, ethers } from "ethers";
import { Modal } from "flowbite-react";
import { Dispatch, useEffect, useState } from "react";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, } from "wagmi";
import { stakingContractAddresses } from "../constants";

function displayNfte(nfte: BigNumber | number): string {
  return Intl.NumberFormat("en-US", {
    maximumFractionDigits: 8,
  }).format(+ethers.utils.formatUnits(nfte));
}

const ClaimNfte = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { nfteStakes } : ReturnType<typeof  useAllStakes> = useAllStakes(address);

  const nftePrepareContractWrite = usePrepareContractWrite<typeof ABI, 'claimSelfNfte', any>({
    address: stakingContractAddresses[chain?.id || 137],
    abi: ABI,
    functionName: "claimSelfNfte",
  });

  const nfteContractWrite = useContractWrite(
    nftePrepareContractWrite.config
  );

  useEffect(() => {
    nfteContractWrite.write?.();
  }, [nfteContractWrite]);

  if (!nfteStakes) return <>No NFTE</>;
  return (
    <>
      Claim {displayNfte(nfteStakes[0].unclaimed)} from NFTE Pool{" "}
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
      <a
        href=""
        className="text-sm text-green-800 hover:underline dark:text-green-400"
      >
        View Tx
      </a>
    </>
  );
};

const ClaimEarthling = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { earthlingStakes } : ReturnType<typeof  useAllStakes> = useAllStakes(address);
  const [state, setState] = useState<string>();

  const args = earthlingStakes
    ?.map((token) => {
      if (token.unclaimed?.gt(0)) {
        return token.tokenId.toNumber();
      }
    })
    .filter((token) => {
      return token !== undefined;
    });

  const { config: earthlingConfig } = usePrepareContractWrite({
    address: stakingContractAddresses[chain?.id || 137],
    abi: ABI,
    functionName: "claimSelfEARTHLING",
    args: [args as any],
  });

  const nfteContractWrite = useContractWrite(
    earthlingConfig
  );

  useEffect(() => {
    nfteContractWrite.write?.();
  }, [nfteContractWrite]);

  if (!earthlingStakes) return <>No Earthlings</>;
  return (
    <>
      Claim {displayNfte(earthlingStakes[0].unclaimed)} from Earthling Pool{" "}
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
      <a
        href=""
        className="text-sm text-green-800 hover:underline dark:text-green-400"
      >
        View Tx
      </a>
    </>
  );
};

const ClaimRoboRover = () => {
  const { chain } = useNetwork();
  const { address } = useAccount();
  const { roboroverStakes } = useAllStakes(address);
  const [state, setState] = useState<string>();

  roboroverStakes
  ?.map((token) => {
    if (token.unclaimed?.gt(0)) {
      return token.tokenId.toNumber();
    }
  })
  .filter((token) => {
    return token !== undefined;
  });

  const { config: roboRoverConfig } = usePrepareContractWrite({
    address: stakingContractAddresses[chain?.id || 137],
    abi: ABI,
    functionName: "claimSelfROBOROVER",
    args: [roboroverStakes as any],
  });

  const roboRoverContractWrite = useContractWrite(
    roboRoverConfig
  );

  useEffect(() => {
    roboRoverContractWrite.write?.();
  }, [roboRoverContractWrite]);

  if (!roboroverStakes) return <>No RoboRover</>;
  return (
    <>
      Claim {displayNfte(roboroverStakes[2].unclaimed)} from RoboRover Pool{" "}
      <CheckCircleIcon className="h-5 w-5 text-green-500" />
      <a
        href=""
        className="text-sm text-green-800 hover:underline dark:text-green-400"
      >
        View Tx
      </a>
    </>
  );
};

//   useEffect(() => {
//     if (state !== "started") {
//       if (earthlingContractWrite.write) {
//         setState("started");
//         earthlingContractWrite.write();
//       }
//     }
//   }, [earthlingContractWrite.write]);

const ClaimAllModal: React.FC<{
  show: boolean;
  setShow: Dispatch<boolean>;
  address: string;
}> = ({ show, setShow }) => {
  const onClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onClose={onClose}>
        <Modal.Header>Claim All Rewards</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <p className="text-sm">
              To claim all your NFTE staking rewards you will need to create
              3 separate transactions from your wallet which should have opened
              automatically. If it did not open please check it manually.
            </p>

            <ol className="gap-y-4">
              <li className="flex items-center gap-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                <ClaimNfte />
              </li>

              <li className="flex items-center gap-2 py-1 text-sm text-gray-500 dark:text-gray-400">
                <ClaimEarthling />
              </li>
              {/* 0 Claim {displayNfte(nftePoolUnclaimed)} from NFTE Pool
                Pool <CheckCircleIcon className="h-5 w-5 text-green-500" />
                <a
                  href=""
                  className="text-sm text-green-800 hover:underline dark:text-green-400"
                >
                  View Tx
                </a>
              </li>
              };
              <li className="flex items-center gap-2 py-1 text-sm text-gray-500 dark:text-gray-400">
               { 1 Claim {displayNfte(earthlingPoolUnclaimed)} from NFTE Pool{" "}
                <XCircleIcon className="h-5 w-5 text-red-800 dark:text-red-500" />{" "}
                <span className="text-sm text-red-900 dark:text-red-400">
                  Rejected
                </span>
              </li>
              }
              <li className="flex items-center gap-2 py-1 text-sm">
                { 1 Claim {displayNfte(earthlingPoolUnclaimed)} from Earthling Pool{" "}
                <WalletIcon className="h-5 w-5" />{" "}
                <span className="text-sms">Confirm</span>
              </li>
              }
              <li className="flex items-center gap-2 py-1 text-sm">
                { 2 Claim {displayNfte(roboroverPoolUnclaimed)} from RoboRover Pool{" "}
                <WalletIcon className="h-5 w-5" />{" "}
                <span className="text-sms">Confirm</span>
              </li>
            }
              <li className="flex items-center gap-2 py-1 text-sm">
               { 3 Claim {displayNfte(earthlingPoolUnclaimed)} from Non-Fungible Web3 Citizen Pool{" "}
                <ClockIcon className="h-5 w-5  text-blue-800 hover:underline dark:text-blue-500" />
                <a
                  href=""
                  className="text-sm text-blue-800 hover:underline dark:text-blue-400"
                >
                  View Tx
                </a>
              </li>
            }
              <li className="flex items-center py-1 text-sm text-gray-500 dark:text-gray-400">
                { 3 Claim {displayNfte(nfw3cPoolUnclaimed)} from Non-Fungible Web3 Citizen Pooll{" "}
          </li> */}
            </ol>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ClaimAllModal;
