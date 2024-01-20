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

const FaqPage = () => {
  const faqs = [
    {
      question: "What are the official links?",
      answer: (
        <>
          <p className="mt-2">
            Please be aware there are bound to be a lot of scams and fake
            websites / X accounts trying to steal your NFTE and/or
            NFTs. If you are unsure you should only use official links.
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
            The official link to the NFTEarth documentation is{" "}
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
          <a className="text-[#79A879FFffa8]" href="https://twitter.com/NFTEarth_L2">
            NFTEarth_L2
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

export default FaqPage;