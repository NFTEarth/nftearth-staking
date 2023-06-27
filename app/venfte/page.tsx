function VeNfte({ question, answer }: { question: string; answer: any }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 flex items-center text-lg font-medium text-zinc-900 dark:text-white">
        {question}
      </h3>
      <div className="text-zinc-700 dark:text-zinc-400">{answer}</div>
    </div>
  );
}

const VeNFTEPage = () => {
  const faqs = [
    {
      question: "What is veNFTE?",
      answer: (
        <>
          <p className="mt-2">
            veNFTE is an innovative liquidity position for NFTE tokens. It is based on the Balancer ve8020 concept and combines NFTE locking with liquidity providing - instead of only locking NFTE for boosted rewards and voting power, 
            you also get to benefit from passive LP rewards and this contributes to building deep liquidity for NFTE.
          </p>
          <p className="mt-2">
            The official link to get the token you need to lock, called NFTFi on Layer2, is at Balancer{" "}
            <a className="underline" href="https://app.balancer.fi/#/arbitrum/pool/0xd0dc20e6342db2de82692b8dc842301ff9121805000200000000000000000454">
            https://app.balancer.fi/#/arbitrum/pool/0xd0dc20e6342db2de82692b8dc842301ff9121805000200000000000000000454
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
          <a className="text-[#1da1f2]" href="https://twitter.com/NFTEarth_L2">
            @NFTEarth_L2
          </a>{" "}
          on Twitter and we will do our best to get you an answer!
        </>
      ),
    },
  ];

  return (
    <>
      <div className="flex flex-col justify-center">
        <h1 className="mb-4 text-4xl font-bold">veNFTE</h1>
        {/* <p className="mb-8">A place to find clarity in a world of uncertainty</p> */}
      </div>
      <div className="mt-4">
        {faqs.map((faq, i) => (
          <VeNfte key={`venfte-${i}`} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
}

export default VeNFTEPage;

