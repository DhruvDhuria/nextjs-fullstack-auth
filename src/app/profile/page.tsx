"use client"
import axios from "axios";
import Link from "next/link";
import React, {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter()

    const [data, setData] = useState("nothing")
    const logout = async () => {
        try {
             await axios.get("/api/users/logout")
             toast.success("logged out successfully")
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me')
        toast.success("found user details")
        console.log(res.data)
        setData(res.data.data.username)
    }

    return (
      <div className="flex flex-col font-sans items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center border border-white px-8 py-4 rounded-xl">
          <h1 className="font-bold text-xl">Profile</h1>
          <hr />
          <h2 className="rounded p-2 bg-green-500">
            {data === "nothing" ? (
              "Nothing"
            ) : (
              <Link href={`/profile/${data}`}>{data}</Link>
            )}
          </h2>
          <button
            onClick={getUserDetails}
            className="bg-green-800 mt-4 hover:bg-green-900 text-white font-bold py-2 px-4 rounded"
          >
            Get User Details
          </button>
          <button
            onClick={logout}
            className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
          <Toaster />
        </div>
      </div>
    );
}