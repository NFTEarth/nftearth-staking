import Staking from "../../components/Staking";

export default async function Page() {
  if (process.env.NEXT_PUBLIC_ENABLE_STAKE !== "TRUE") {
    return (
      <>
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex flex-col justify-center">
            <h1 className="mb-4 flex items-center text-4xl font-bold ">
              NFTE Staking{" "}
            </h1>
            <p className="mb-2">NFTEarth Staking Rewards</p>
          </div>
        </div>

        <p className="mt-2">
          Follow{" "}
          <a className="text-[#A879FF]" href="https://twitter.com/NFTEarth_L2">
            NFTEarth_L2
          </a>{" "}
          on X for announcements.
        </p>
      </>
    );
  }

  return <Staking />;
}
