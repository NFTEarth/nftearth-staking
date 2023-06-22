import { useAccount, useContractRead, useNetwork } from "wagmi";
import NFTETokenABI from "@/abis/nfteToken";
import { Map } from "@/types/map";

const stakingContractAddresses: Map = {
  42161: "0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe",
} as const;

const nfteContractAddresses: Map = {
  42161: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
} as const;

function useAllowance() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const allowanceContractRead = useContractRead({
    enabled: address !== undefined,
    address: nfteContractAddresses[chain?.id || 42161],
    abi: NFTETokenABI,
    functionName: "allowance",
    args: [
      address as `0x${string}`,
      stakingContractAddresses[chain?.id || 42161] as `0x${string}`,
    ],
  });

  return allowanceContractRead;
}

export default useAllowance;
