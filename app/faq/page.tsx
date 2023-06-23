function Question({ question, answer }: { question: string; answer: any }) {
  return (
    <div className="mb-10">
      <h3 className="mb-4 flex items-center text-lg font-medium text-zinc-900 dark:text-white">
        {question}
      </h3>
      <div className="text-zinc-700 dark:text-zinc-400">{answer}</div>
    </div>
  );
}
export default async function Page() {
  const faqs = [
    {
      question: "What are the official links?",
      answer: (
        <>
          <p className="mt-2">
            Please be aware there are bound to be a lot of scams and fake
            websites / Twitter accounts trying to steal your NFTE and/or
            NFTs. If you're unsure you should only use official links.
          </p>
          <p className="mt-2">
            The official link to NFTEarth is{" "}
            <a className="underline" href="https://nftearth.exchange">
              https://nftearth.exchange
            </a>
          </p>

          <p className="mt-2">
            The official link to the staking website is{" "}
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
      question: "Can I unstake or withdraw anytime?",
      answer:
        "Yes, there is no locking period for withdrawing staked NFTE or claiming rewards.",
    },
    {
      question: "When I stake do my NFTs leave my wallet?",
      answer: (
        <>
          <p className="mt-2">
            No, only the NFTE gets deposited into the contract. Your NFTs act
            as "keys" to withdraw or claim any apecoin rewards, if you don't
            hold the NFT you can't get the NFTE out of the contract, but the
            new owner can.
          </p>
        </>
      ),
    },
    {
      question:
        "If I stake into an NFT pool (Earthling, RoboRover, Non-Fungible Web3 Citizen) can I sell my NFT?",
      answer:
        "You should first withdraw all NFTE paired with the NFT or you will lose access to it.",
    },
    {
      question: "What are the maximum limits for staking?",
      answer: (
        <>
          <ul>
            <li>NFTE pool: No limit</li>
            <li>Earthling pool: 5000</li>
            <li>RoboRover pool: 500</li>
            <li>Non-Fungible Web3 Citizen pool: 250</li>
          </ul>
        </>
      ),
    },
    {
      question: "Is this site safe?",
      answer: (
        <>
         We hope so, and have done our best to ensure at all information is
          accurate and interactions with the NFTEarth information and staking contracts are
          correct. All the{" "}
          <a
            className="underline"
            href="https://github.com/NFTEarth/nftearth-staking"
          >
            source code is open-source and available on GitHub
          </a>
          . That being said there are still risks involved, and we assume no
          liability or provide any warranty.
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
        <h1 className="mb-4 text-4xl font-bold">Common Questions</h1>
        {/* <p className="mb-8">A place to find clarity in a world of uncertainty</p> */}
      </div>
      <div className="mt-4">
        {faqs.map((faq, i) => (
          <Question key={i} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </>
  );
}
