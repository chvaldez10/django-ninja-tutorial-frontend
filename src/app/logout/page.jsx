"use client";

import { useAuth } from "@/components/authProvider";
const LOGOUT_URL = "/api/logout/";

export default function Page() {
  const auth = useAuth();
  async function handleClick(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: "",
    };
    const response = await fetch(LOGOUT_URL, requestOptions);
    if (response.ok) {
      console.log("logged out");
      auth.logout();
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg max-w-md mx-auto py-8 px-6 items-center justify-center flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Are you sure you want to logout?
        </h1>
        <button
          className="bg-purple-500 text-white hover:bg-purple-400 transition duration-200 ease-in-out px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          onClick={handleClick}
        >
          Yes, logout
        </button>
      </div>
    </div>
  );
}
