"use client";
import { useState } from "react";
import Image from "next/image";
import useSWR from "swr";
import { useAuth } from "@/components/authProvider";
import { ThemeToggleButton } from "@/components/themeToggleButton";
import WaitlistForm from "./waitlists/forms";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const auth = useAuth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <WaitlistForm />
      </div>
      <div>{auth.isAuthenticated ? "Hello user" : "Hello guest"}</div>
      <div>
        <ThemeToggleButton />
      </div>
    </main>
  );
}
