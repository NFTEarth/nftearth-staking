import Events from "../../components/events";
import Data from "../../components/data";
import UserStaking from "../../components/userStaking";

export default async function Page() {
  return (
    <>
      <div>
        <UserStaking />
      </div>

      <div className="mt-10">
        <h3 className="text-3xl font-bold">Mint an Earthling</h3>
        <Data />
      </div>


{ <div className="mt-10">
  <h3 className="text-3xl font-bold">Live Minting Activity:</h3>
  <Events />
</div> }
</>
);
}

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