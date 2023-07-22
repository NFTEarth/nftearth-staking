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
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const { config: approveConfig } = usePrepareContractWrite({
    enabled: isConnected,
    address: nfteContractAddresses[chain?.id || CHAIN_ID],
    abi: ABI,
    functionName: "approve",
    args: [
      stakingContractAddresses[chain?.id || CHAIN_ID],
      ethers.constants.MaxUint256,
    ],
  });

  const approveContractWrite = useContractWrite(approveConfig);

  const waitForApproveTransaction = useWaitForTransaction({
    hash: approveContractWrite.data?.hash,
    confirmations: 2,
    onSuccess() {
      approveContractWrite.reset();
    },
  });

  const handleApproveClick = () => {
    approveContractWrite.write?.();
  };

  return (
    <button
      className="ml-2 border px-3 py-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
      disabled={approveContractWrite.isLoading || waitForApproveTransaction.isFetching || waitForApproveTransaction.isLoading}
      onClick={handleApproveClick}
    >
      Approve NFTE Staking Allowance
    </button>
  );
}
