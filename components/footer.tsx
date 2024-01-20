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
          className="text-[##A879FF]"
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
          href="https://polygonscan.com/address/0x492Fa53b88614923937B7197C87E0F7F8EEb7B20#code"
        >
         Staking Contract Address 
        </a>{" "}
        on Polygonscan.
      </p>
    </footer>
  );
}
