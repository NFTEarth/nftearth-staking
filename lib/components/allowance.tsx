"use client";

import { ethers } from "ethers";
import {
  useAccount,
  useNetwork,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";

import ABI from "@/abis/nfteToken";
import { Map } from "@/types/map";

const nfteContractAddresses: Map = {
  42161: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
  
};

const stakingContractAddresses: Map = {
  42161: "0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe",
};

export default function Allowance() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: nfteContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, stakingContractAddresses[chain?.id || 42161]],
  });

  const { config } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: nfteContractAddresses[chain?.id || 42161],
    abi: ABI,
    functionName: "approve",
    args: [
      stakingContractAddresses[chain?.id || 42161],
      ethers.constants.MaxUint256,
    ],
  });

  const contractWrite = useContractWrite(config);

  const waitForTransaction = useWaitForTransaction({
    hash: contractWrite.data?.hash,
    confirmations: 2,
    onSuccess() {
      allowanceContractRead.refetch();
      contractWrite.reset();
    },
  });

  return (
    <>
      <button
        className="ml-2 border px-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
        disabled={
          contractWrite.isLoading ||
          waitForTransaction.isFetching ||
          waitForTransaction.isLoading
        }
        onClick={() => {
          contractWrite.write?.();
        }}
      >
        Approve NFTE Staking Unlimited Allowance
      </button>
    </>
  );
}
