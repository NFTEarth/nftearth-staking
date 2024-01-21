import Link from "next/link";
import Events from "../components/events";
import Countdown from "../components/countdown";

export default async function Page() {
  return (
    <>
      <h1 className="text-4xl font-bold">NFTE Staking Rewards</h1>
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        <Link
          shallow={true}
          href="/data"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">Data</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Real-Time staking data about how many NFTE you can stake and your daily
            rewards.
          </p>
        </Link>
        <Link
          shallow={true}
          href="/stake"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight">Stake</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
            Manage your staking positions and staking contract allowances for NFTE
            allowance.
          </p>
        </Link>
       <Link
          shallow={true}
          href="https://app.balancer.fi/#/arbitrum/pool/0xd0dc20e6342db2de82692b8dc842301ff9121805000200000000000000000454"
          className={`block border border-zinc-200 bg-white p-6 hover:bg-zinc-100
          dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800 sm:max-w-sm`}
        >
         <h5 className="mb-2 text-2xl font-bold tracking-tight">xNFTE</h5>
          <p className="text-zinc-700 dark:text-zinc-400">
           The innovative tokenomic model for $NFTE holders designed to increase protocol value over time by staking LP positions.
           Get your LP position, stake, and then earn rewards and governance power.
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
            protect yourself.
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
