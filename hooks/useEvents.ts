import { useContractEvent, useProvider } from "wagmi";
import {BigNumber, Contract } from "ethers";

import StakingABI from "../abis/staking";
import useStore from "../hooks/useStore";
import { useEffect, useRef } from "react";
import { NFTE_STAKING_CONTRACT_ADDRESS } from "../constants";

const useEvents = () => {
  const alreadyAdded = useRef(false);
  const events = useStore((state) => state.events);
  const addEvent = useStore((state) => state.addEvent);

  const provider = useProvider();

  async function connectToMetamask() {
    const contract = new Contract(
      NFTE_STAKING_CONTRACT_ADDRESS,
      StakingABI,
      provider
    );

    const blockNumber = await provider.getBlockNumber();

    const claimEventFilter = contract.filters.ClaimRewardsNft();
    const claimPastEvents = await contract.queryFilter(
      claimEventFilter,
      blockNumber - 100
    );

    for (let i = 0; i < claimPastEvents.length; i++) {
      const pastEvent = claimPastEvents[i];
      addEvent({
        type: "Claim",
        user: pastEvent.args?.user!,
        amount: pastEvent.args?.amount!,
        poolId: pastEvent.args?.poolId.toNumber()!,
        hash: pastEvent.transactionHash,
      });
    }
  }

  useEffect(() => {
    if (alreadyAdded.current) return;
    connectToMetamask();
    alreadyAdded.current = true;
  }, [alreadyAdded]);

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "Deposit",
    listener(...args) {
      addEvent({
        type: "Deposit",
        user: args[0] as string,
        amount: args[1] as BigNumber,
        poolId: 0,
        hash: (args[3] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "DepositNft",
    listener(...args) {
      addEvent({
        type: "Deposit",
        user: args[0] as string,
        poolId: (args[1] as BigNumber).toNumber(),
        amount: args[2] as BigNumber,
        hash: (args[4] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "DepositPairNft",
    listener(...args) {
      addEvent({
        type: "Deposit",
        user: args[0] as string,
        amount: args[1] as BigNumber,
        poolId: 3,
        hash: (args[5] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "Withdraw",
    listener(...args) {
      addEvent({
        type: "Withdraw",
        user: args[0] as string,
        amount: args[1] as BigNumber,
        poolId: 0,
        hash: (args[3] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: "0x5954aB967Bc958940b7EB73ee84797Dc8a2AFbb9",
    abi: StakingABI,
    eventName: "WithdrawNft",
    listener(...args) {
      addEvent({
        type: "Withdraw",
        user: args[0] as string,
        poolId: (args[1] as BigNumber).toNumber(),
        amount: args[2] as BigNumber,
        hash: (args[5] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "WithdrawPairNft",
    listener(...args) {
      addEvent({
        type: "Withdraw",
        user: args[0] as string,
        amount: args[1] as BigNumber,
        poolId: 3,
        hash: (args[5] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "ClaimRewards",
    listener(...args) {
      addEvent({
        type: "Claim",
        user: args[0] as string,
        amount: args[1] as BigNumber,
        poolId: 0,
        hash: (args[3] as any).transactionHash,
      });
    },
    chainId: 42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "ClaimRewardsNft",
    listener(...args) {
      addEvent({
        type: "Claim",
        user: args[0] as string,
        poolId: (args[1] as BigNumber).toNumber(),
        amount: args[2] as BigNumber,
        hash: (args[4] as any).transactionHash,
      });
    },
    chainId:42161,
  });

  useContractEvent({
    address: NFTE_STAKING_CONTRACT_ADDRESS,
    abi: StakingABI,
    eventName: "ClaimRewardsPairNft",
    listener(...args) {
      addEvent({
        type: "Claim",
        user: args[0] as string,
        amount: args[1] as BigNumber,
        poolId: 3,
        hash: (args[5] as any).transactionHash,
      });
    },
    chainId: 42161 ,
  });

  return events;
};

export default useEvents;
