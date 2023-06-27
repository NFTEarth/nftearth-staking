function MintEarthling({ question, answer }: { question: string; answer: any }) {
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
        question: "Where do I mint an Earthling?",
        answer: (
          <>
            <p className="mt-2">
              Mint on of the capped supply flagship NFTs at the Earthling mint page!
            </p>
            <p className="mt-2">
              The official link to get the is{" "}
              <a className="underline" href="https://mintearthling.nftearth.exchange">
                https://mintearthling.nftearth.exchange
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
          <h1 className="mb-4 text-4xl font-bold">Mint</h1>
          {/* <p className="mb-8">A place to find clarity in a world of uncertainty</p> */}
        </div>
        <div className="mt-4">
          {faqs.map((faq, i) => (
            <MintEarthling key={i} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </>
    );
  }
  
  