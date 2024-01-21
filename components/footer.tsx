export default function Footer() {
  return (
    <footer className="mt-8 mb-12 text-center">
      <p>
        Built by{" "}
        <a className="text-[##A879FF]" href="https://twitter.com/NFTEarth_L2">
          NFTEarth
        </a>
        
      </p>
      <p>
        View the{" "}
        <a
          className="text-[##FFA879]"
          href="https://github.com/NFTEarth/nftearth-staking"
        >
          source code
        </a>{" "}
        on GitHub. 
      </p>

      <p>
        View the {" "}
        <a
          className="text-[##A879FF]"
          href="https://arbiscan.io/address/0xb37cd5fF087116B6Af620C69DeC2a03Ca5e5CaDe#code"
        >
         Staking Contract Address 
        </a>{" "}
        on Polygonscan.
      </p>
    </footer>
  );
}
