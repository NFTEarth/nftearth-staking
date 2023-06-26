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
