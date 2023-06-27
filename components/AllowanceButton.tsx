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

  const { config: approveConfig } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: nfteContractAddresses[chain?.id || CHAIN_ID],
    abi: ABI,
    functionName: "approve",
    args: [
      stakingContractAddresses[chain?.id || CHAIN_ID],
      ethers.constants.MaxUint256,
    ],
  });

  const { config: depositConfig } = usePrepareContractWrite({
    enabled: isConnected && allowanceContractRead.isSuccess,
    address: stakingContractAddresses[chain?.id || CHAIN_ID],
    abi: ABI,
    functionName: "depositNfte",
    args: [
      // Provide necessary arguments for the depositNfte function
    ],
  });

  const approveContractWrite = useContractWrite(approveConfig);
  const depositContractWrite = useContractWrite(depositConfig);

  const waitForApproveTransaction = useWaitForTransaction({
    hash: approveContractWrite.data?.hash,
    confirmations: 2,
    onSuccess() {
      approveContractWrite.reset();
    },
  });

  const waitForDepositTransaction = useWaitForTransaction({
    hash: depositContractWrite.data?.hash,
    confirmations: 2,
    onSuccess() {
      depositContractWrite.reset();
    },
  });

  const handleApproveClick = () => {
    approveContractWrite.write?.();
  };

  const handleDepositClick = () => {
    depositContractWrite.write?.();
  };

  return (
    <div>
      {!allowanceContractRead.isSuccess && (
        <button
          className="ml-2 border px-3 py-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
          disabled={approveContractWrite.isLoading || waitForApproveTransaction.isFetching || waitForApproveTransaction.isLoading}
          onClick={handleApproveClick}
        >
          Approve NFTE Staking Allowance
        </button>
      )}

      {allowanceContractRead.isSuccess && (
        <button
          className="ml-2 border px-3 py-2 hover:border-gray-500 disabled:text-gray-400 disabled:hover:cursor-not-allowed dark:border-slate-500 dark:bg-slate-800  dark:hover:border-slate-300"
          disabled={depositContractWrite.isLoading || waitForDepositTransaction.isFetching || waitForDepositTransaction.isLoading}
          onClick={handleDepositClick}
        >
          Stake NFTE
        </button>
      )}
    </div>
  );
}
