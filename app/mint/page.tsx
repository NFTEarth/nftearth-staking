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
      question: "How many Earthlings are there?",
      answer: (
        <>
          <p className="mt-2">
            4,444 is the max total supply that will ever exist.
          </p>
          <p className="mt-2">
            The official link to NFTEarth is{" "}
            <a className="underline" href="https://nftearth.exchange">
              https://nftearth.exchange
            </a>
          </p>

          <p className="mt-2">
            The official link to the minting website is{" "}
            <a className="underline" href="https://mintearthling.nftearth.exchange">
            https://mintearthling.nftearth.exchange
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
