import WebSearchResults from "@/components/WebSearchResults";
import Link from "next/link";
import React from "react";

const WebSearchPage = async ({ searchParams }) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CONTEXT_KEY}&q=${searchParams.searchTerm}`
  );

  if (!res.ok) {
    throw new Error("Something went wrong!");
  }

  const data = await res.json();
  const result = await data?.items;

  if (!result) {
    return (
      <div className="flex flex-col justify-center items-center pt-10">
        <h1 className="text-3xl mb-4">No results found</h1>
        <p className="text-lg">
          Try searching for something else or go back to the homepage{" "}
          <Link href="/" className="text-blue-500">
            Home
          </Link>
        </p>
      </div>
    );
  }

  return <>{result && <WebSearchResults results={data} />}</>;
};

export default WebSearchPage;
