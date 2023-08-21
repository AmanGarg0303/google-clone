import React from "react";

const WebSearchPage = async ({ searchParams }) => {
  const res = await fetch(
    `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CONTEXT_KEY}&q=${searchParams.searchTerm}`
  );

  const data = await res.json();

  const result = await data?.items;

  return <>{result && result.map((r) => <h1 key={r.id}>{r.title}</h1>)}</>;
};

export default WebSearchPage;
