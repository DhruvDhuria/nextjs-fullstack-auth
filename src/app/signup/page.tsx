"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
  const router = useRouter();

  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false)

  const onSignup = async () => {
    try {
        setLoading(true)
        const response = await axios.post("/api/users/signup", user)
        console.log("Sign up success", response.data)
        router.push('/login')
    } catch (error: any) {
        console.log("Signup failed", error.message)
        toast.error(error.message)
    } finally {
        setLoading(false)
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.username.length > 0 &&
      user.password.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center font-sans justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center border border-white px-8 py-4 rounded-xl">
        <h1 className="font-bold text-2xl">{loading ? "Processing" : "Signup"}</h1>
        <br />
        <label htmlFor="username" className="self-start pl-3">
          username
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="username"
        />
        <label htmlFor="email" className="self-start pl-3">
          email
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="email"
        />
        <label htmlFor="password" className="self-start pl-3">
          password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />

        <button
          onClick={onSignup}
          className={
            buttonDisabled
              ? "p-2 border border-gray-300 rounded-lg mb-4 font-semibold text-gray-500 focus:outline-none focus:border-gray-600"
              : "p-2 border border-gray-300  rounded-lg mb-4 font-semibold focus:outline-none focus:border-gray-600"
          }
        >
          Signup
        </button>
        <Link href={"/login"}>Already have an account? Login</Link>
      </div>
    </div>
  );
}
