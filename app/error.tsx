"use client";

import { useEffect } from "react";

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h1 className="mt-10 text-4xl font-bold">NFTEarth Staking</h1>
      <p className="mt-4">Something went wrong!</p>
      <p className="mt-4">
        Please try refreshing the page or contacting{" "}
        <a className="text-[#A879FF]" href="https://twitter.com/NFTEarth_L2">
          NFTEarth_L2
        </a>{" "}
        on Twitter.
      </p>
    </div>
  );
}
