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

import ABI from "../abis/nfteToken";

import {
  CHAIN_ID,
  nfteContractAddresses,
  stakingContractAddresses
} from "../constants";

export default function AllowanceButton() {
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: nfteContractAddresses[chain?.id || CHAIN_ID],
    abi: ABI,
    functionName: "allowance",
    args: [address as `0x${string}`, stakingContractAddresses[chain?.id || CHAIN_ID]],
  });

  const { config } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: nfteContractAddresses[chain?.id || CHAIN_ID],
    abi: ABI,
    functionName: "approve",
    args: [
      stakingContractAddresses[chain?.id || CHAIN_ID],
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
    <button
      className="ml-2 border px-3 py-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
      disabled={
        contractWrite.isLoading ||
        waitForTransaction.isFetching ||
        waitForTransaction.isLoading
      }
      onClick={() => {
        contractWrite.write?.();
      }}
    >
      Approve NFTE Staking
    </button>
  );
}
