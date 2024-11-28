"use client";

import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR(
    "http://127.0.0.1:8001/api/waitlists/1",
    fetcher
  );

  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }

  return <div>Hello World</div>;
}
