import { useAccount, useBalance, useNetwork } from "wagmi";
import { useEffect } from "react";

interface Map {
  [key: number]: string;
}
const nfteContractAddresses: Map = {
  42161: "0xB261104A83887aE92392Fb5CE5899fCFe5481456",
} as const;

import useStore from "@/stores/store";

const nfteBalance = () => {
  const nfteBalance = useStore((state) => state.nfteBalance);
  const setNfteBalance = useStore((state) => state.setNfteBalance);

  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const balance = useBalance({
    enabled: isConnected,
    address: address,
    token: nfteContractAddresses[chain?.id!] as `0x{String}`,
    watch: true,
  });

  useEffect(() => {
    if (balance.data) {
      setNfteBalance(balance.data.value);
    }
  }, [balance.isSuccess, balance.isRefetching, balance.data]);

  useEffect(() => {
    if (!isConnected) {
      setNfteBalance(undefined);
    }
  }, [isConnected]);

  return { nfteBalance, setNfteBalance };
};

export default useNfteBalance;
