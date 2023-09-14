function XNfte({ question, answer }: { question: string; answer: any }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 flex items-center text-lg font-medium text-zinc-900 dark:text-white">
        {question}
      </h3>
      <div className="text-zinc-700 dark:text-zinc-400">{answer}</div>
    </div>
  );
}

const XNFTEPage = () => {
  const faqs = [
    {
      question: "What is xNFTE?",
      answer: (
        <>
          <p className="mt-2">
            xNFTE is an innovative revenue sharing mechanism developed to create
            Real Yield for long-term stakeholders in NFTE. An xNFTE position is
            acquired by depositing liquidity into Uniswapv3, and then staking
            that position. Instead of just staking your NFTE for boosted rewards and governance power,
            you also get to benefit of passive LP rewards and this contributes
            to building deep liquidity for NFTE.
          </p>
          <p className="mt-2">
            Tp get the token to lock, create your liquidity position on Uniswap{" "}
            <a
              className="underline"
              href="https://app.uniswap.org/#/add/ETH/0x51B902f19a56F0c8E409a34a215AD2673EDF3284/10000?minPrice=0.0000000000000000000000000000000000000029602&maxPrice=337820000000000000000000000000000000000"
            >
              https://app.uniswap.org/#/add/ETH/0x51B902f19a56F0c8E409a34a215AD2673EDF3284/10000?minPrice=0.0000000000000000000000000000000000000029602&maxPrice=337820000000000000000000000000000000000
            </a>
          </p>

          <p className="mt-2">
            The official link to the NFTE staking website is{" "}
            <a className="underline" href="https://staking.nftearth.exchange">
              https://staking.nftearth.exchange
            </a>
          </p>
          <p className="mt-2">
            The official link to the staking contract documentation is{" "}
            <a className="underline" href="https://docs.nftearth.exchange">
              https://docs.nftearth.exchange
            </a>
          </p>
          <p className="mt-2">
            The official twitter account for NFTEarth is{" "}
            <a className="underline" href="https://twitter.com/NFTEarth_L2">
              @NFTEarth_L2
            </a>
          </p>
        </>
      ),
    },
    {
      question: "Got a question you still want answered?",
      answer: (
        <>
          Send a tweet or DM{" "}
          <a className="text-[#79ffa8]" href="https://twitter.com/NFTEarth_L2">
            @NFTEarth_L2
          </a>{" "}
          on X and we will do our best to get you an answer!
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-bold">xNFTE</h1>
        {/* <p className="mb-8">A place to find clarity in a world of uncertainty</p> */}
      </div>
      <div className="mt-4">
        {faqs.map((faq, i) => (
          <XNfte
            key={`xnfte-${i}`}
            question={faq.question}
            answer={faq.answer}
          />
        ))}
      </div>
    </>
  );
};

export default XNFTEPage;
