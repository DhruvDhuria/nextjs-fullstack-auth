"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/users/login", user);
      console.log(response);
      toast.success("Login success");
      router.push("/profile");
    } catch (error: any) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center font-sans justify-center min-h-screen py-2">
      <div className="flex flex-col items-center justify-center border border-white px-8 py-4 rounded-xl">
        <h1 className="font-bold text-2xl">{loading ? "Processing" : "Login"}</h1>
        <br />
        <label htmlFor="email" className="self-start pl-2">
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
        <label htmlFor="password" className="self-start pl-2">
          password
        </label>
        <input
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
          type="password"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="password"
        />
        <Link
          href={"/resetpassword"}
          className="font-bold mb-4 text-sm self-end m-1"
        >
          Forgot Password?
        </Link>

        <button
          onClick={onLogin}
          className={
            buttonDisabled
              ? "p-2 border border-gray-300 rounded-lg mb-4 font-semibold text-gray-500 focus:outline-none focus:border-gray-600"
              : "p-2 border border-gray-300  rounded-lg mb-4 font-semibold focus:outline-none focus:border-gray-600"
          }
        >
          Login
        </button>
        <Link href={"/signup"}>Dont have an account? Signup</Link>
      </div>
    </div>
  );
}
