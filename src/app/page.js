"use client";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(
    "http://127.0.0.1:8000/api/waitlists/1",
    fetcher
  );

  const handleClick = () => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleClick}
        className="bg-blue-500 text-white p-2 rounded-md"
      >
        Click me
      </button>
    </div>
  );
}
