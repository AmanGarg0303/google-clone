"use client";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import Image from "next/image";

const HomeSearch = () => {
  const [input, setInput] = useState("");
  const [randomSearchLoading, setRandomSearchLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    router.push(`/search/web?searchTerm=${input}`);
  };

  const randomSearch = async () => {
    setRandomSearchLoading(true);

    const res = await fetch(`https://random-word-api.herokuapp.com/word`)
      .then((res) => res.json())
      .then((data) => data[0]);

    if (!res) return;

    router.push(`/search/web?searchTerm=${res}`);
    setRandomSearchLoading(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex w-full mt-5 mx-auto max-w-[90%] items-center border border-gray-200 px-5 py-3 rounded-full hover:shadow-md focus-within:shadow-md transition-shadow sm:max-w-xl lg:max-w-2xl"
      >
        <AiOutlineSearch className="text-xl text-gray-500 mr-3" />

        <input
          type="text"
          placeholder="Search"
          className="flex-grow focus:outline-none"
          onChange={(e) => setInput(e.target.value)}
        />

        <BsFillMicFill className="text-lg" />
      </form>

      <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:space-x-4 justify-center mt-8">
        <button onClick={handleSubmit} className="btn">
          Google Search
        </button>
        <button
          disabled={randomSearchLoading}
          onClick={randomSearch}
          className="btn disabled:opacity-80"
        >
          {randomSearchLoading ? (
            <Image
              src="spinner.svg"
              alt="..."
              width="25"
              height="25"
              className="mx-auto"
            />
          ) : (
            "I am Feeling Lucky"
          )}
        </button>
      </div>
    </>
  );
};

export default HomeSearch;
