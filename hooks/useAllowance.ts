import { useAccount, useContractRead, useNetwork } from "wagmi";
import NFTETokenABI from "../abis/nfteToken";
import {
  stakingContractAddresses,
  nfteContractAddresses,
  CHAIN_ID
} from "../constants";
import {BigNumber} from "ethers";

function useAllowance() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  return useContractRead<typeof NFTETokenABI, 'allowance', BigNumber>({
    enabled: address !== undefined,
    address: nfteContractAddresses[chain?.id || CHAIN_ID],
    abi: NFTETokenABI,
    functionName: "allowance",
    args: [
      address as `0x${string}`,
      stakingContractAddresses[chain?.id || CHAIN_ID] as `0x${string}`,
    ],
  });
}

export default useAllowance;
