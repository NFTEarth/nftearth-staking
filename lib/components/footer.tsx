export default function Footer() {
  return (
    <footer className="mt-8 mb-12 text-center">
      <p>
        Made by{" "}
        <a className="text-[#1da1f2]" href="https://twitter.com/NFTEarth_L2">
          @NFTEarth_L2 $NFTE
        </a>
        
      </p>
      <p>
        View the{" "}
        <a
          className="text-[#1da1f2]"
          href="https://github.com/NFTEarth/nftearth-staking"
        >
          source code
        </a>{" "}
        on GitHub. Shoutout to ApeCoin Collector for the original open-source repo.
      </p>

      <p>
        View the {" "}
        <a
          className="text-[#1da1f2]"
          href="https://https://arbiscan.io/address/0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe#code"
        >
         Staking Contract Address 
        </a>{" "}
        on Arbiscan.
      </p>
    </footer>
  );
}
