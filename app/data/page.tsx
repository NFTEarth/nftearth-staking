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
        <h3 className="text-3xl font-bold">Real-Time Staking Data:</h3>
        <Data />
      </div>

      <div className="mt-10">
        <h3 className="text-3xl font-bold">Staking Calculator:</h3>
        <Calculator />
      </div>

      { <div className="mt-10">
        <h3 className="text-3xl font-bold">Live Staking Activity:</h3>
        <Events />
      </div> }
    </>
  );
}
