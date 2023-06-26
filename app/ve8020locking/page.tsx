import Events from "../../components/events";
import Data from "../../components/data";
import Calculator from "../../components/calculator";
import UserStaking from "../../components/userStaking";

export default async function Page() {
  return (
    <>
      <div>
        <UserStaking />
      </div>

      <div className="mt-10">
        <h3 className="text-3xl font-bold">Real-Time Balancer Pool LP Data:</h3>
        <Data />
      </div>

      <div className="mt-10">
        <h3 className="text-3xl font-bold">Lock your NFTFi on Layer2 BPT tokens to earn boosted rewards! This is NFTE's primary way to build liquidity going forward, on Balancer on Arbitrum, using a veTokenomic model.</h3>
        <Calculator />
      </div>

      { <div className="mt-10">
        <h3 className="text-3xl font-bold">The more you lock, and for longer, the more influence you have in governance decisions and rewards from the protocol. veNFTE is the path to a sustainable base of liquidity for the protofol!</h3>
        <Events />
      </div> }
    </>
  );
}
