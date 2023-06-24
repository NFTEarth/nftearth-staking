import Link from "next/link";
import Events from "@/components/events";
import Countdown from "@/components/countdown";

export default async function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold">NFTEarth Staking</h1>
      <p className="mt-4">
       NFTEarth Staking Rewards
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link
          shallow={true}
          href="/data"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">Data</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Real-Time staking data about how many NFTE you can stake and earn daily in
            rewards.
          </p>
        </Link>
        <Link
          shallow={true}
          href="/stake"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            Stake{" "}
            <span className="mr-2 rounded bg-yellow-200 px-2.5 py-0.5 text-sm font-semibold text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900">
              BETA FEATURE
            </span>
          </h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Manage your NFTE staking positions and staking contract allowance on NFTE
            allowance.
          </p>
        </Link>
        <Link
          shallow={true}
          href="/faq"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">FAQ</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Answers to common questions around staking, NFTE and how to
            protect yourself in web3.
          </p>
        </Link>
        <Link
          shallow={true}
          href="/mint"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">Earthlings</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Mint an Earthling NFT!
          </p>
        </Link>
        <Link
          shallow={true}
          href="/mint"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">Raffle</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Enter the Raffle to Win NFTs, $NFTE, and more!
          </p>
        </Link>
      </div>

      {/* <div className="mt-10">
        <h3 className="text-3xl font-bold">Live Staking Activity:</h3>
        <Events />
      </div> */}
    </>
  );
}
