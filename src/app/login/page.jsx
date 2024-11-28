"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/components/authProvider";

const LOGIN_URL = "/api/login/";

export default function Page() {
  const auth = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();

    // get the form data
    const formData = new FormData(event.target);
    const objectFromForm = Object.fromEntries(formData);
    const jsonData = JSON.stringify(objectFromForm);

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    };

    // call the login API
    const response = await fetch(LOGIN_URL, requestOptions);

    let data = {};

    try {
      data = await response.json();
    } catch (error) {
      console.log("error parsing response", error);
    }

    // if the response is ok, login the user
    if (response.ok) {
      console.log("logged in");
      auth.login(data?.username);
    } else {
      console.log(data);
    }
  }

  return loading ? (
    <div className="flex justify-center items-center h-screen">Loading...</div>
  ) : auth.isAuthenticated ? (
    <div className="flex justify-center items-center h-screen">
      You are already logged in
    </div>
  ) : (
    <div className="w-full lg:grid lg:min-h-[85vh]  lg:grid-cols-2 xl:min-h-[90vh]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="username"
                  name="username"
                  placeholder="Your username"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/forgot-password" className="hidden">
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" name="password" type="password" required />
              </div>
              <Button type="submit" className="w-full bg-violet-600">
                Login
              </Button>
            </form>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="mx-auto bg-muted w-96 h-96">
        <Image
          src="/nmixx-logo.jpg"
          alt="Image"
          width="1200"
          height="1200"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
