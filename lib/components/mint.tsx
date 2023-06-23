import { Web3Button } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { earthlingContractAddress } from "../../constants/contractAddresses";
import styles from "../styles/Home.module.css";
import { useWeb3Modal } from "@web3modal/react";
const Mint: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>Mint An Earthling NFT! </h1>
      
      <p className={styles.explain}>
        Mint one of the limited supply Earthling NFTs! 
        <br>
        </br> It will be used in many ways in the future and can evolve over time and is 
        <br>
        </br> ONLY 0.004444 $ETH to mint!
        </p>

      <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

      <Web3Button
        theme="dark"
        contractAddress={earthlingContractAddress}
        action={(contract) => contract.erc721.claim(1)}
        onSuccess={() => {
          alert("NFT Claimed!");
          router.push("/stake");
        }}
        onError={(error) => {
          alert(error);
        }}
      >
        Mint Now!
      </Web3Button>
    </div>
  );
};

export default Mint;