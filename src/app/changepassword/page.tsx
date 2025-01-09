"use client"

import React, {useEffect, useState} from "react"
import axios from "axios"
import Link from "next/link"
import toast, { Toaster } from "react-hot-toast"

export default function ChangePassword() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [token, setToken] = useState("")
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState("")
    const [buttonDisabled, setButonDisabled] = useState(false)

    const sendRequest = async () => {
        try {
            setLoading(true)
            await axios.post('/api/users/changepassword', {password, confirmPassword, token})
            toast.success("Password changed successfully")
        } catch (error: any) {
            console.log(error.response.data)   
            toast.error("Failed to change password")
        } finally {
            setLoading(false)
        }
    }
    
    // useEffect(() => {
    //   if (password.length > 0 && confirmPassword.length > 0) {
    //     setButonDisabled(false)
    //   } else {
    //     setButonDisabled(true)
    //   }
    // })
    
    const checkConfirmPassword = (e: any) => {
      if (password !== e.target.value) {
        setMessage('Password doesnt match')
      } else if (password === e.target.value) {
        setMessage("")
      }
      setConfirmPassword(e.target.value)
    }

    useEffect(() => {
      if (password.length > 0 && confirmPassword.length > 0 && message === "") {
        setButonDisabled(false)
      } else {
        setButonDisabled(true)
      }
    }, [password, confirmPassword, message])

    useEffect(() => {
        const urlToken = window.location.search.split('=')[1]
        setToken(urlToken || "")
    }, [])

    return (
      <div className="flex flex-col items-center font-sans justify-center min-h-screen py-2">
        <Toaster />
        <div className="flex flex-col items-center justify-center border border-white px-8 py-4 rounded-xl">
          <h2 className="text-xl font-bold mb-2">{loading ? "Processing" : "Change Password"}</h2>
          <label htmlFor="password" className="self-start">Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
          />
          <label htmlFor="password" className="self-start">Confirm Password</label>
          <input
            id="password"
            type="password"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => checkConfirmPassword(e)}
            className="p-2 border border-gray-300 rounded-lg mb-1 focus:outline-none focus:border-gray-600 text-black"
          />
          <p className="mb-4 text-sm">{message}</p>
          <button
            type="submit"
            onClick={sendRequest}
            className={
              buttonDisabled
                ? "p-2 border border-gray-300 rounded-lg mb-4 font-semibold text-gray-500 focus:outline-none focus:border-gray-600"
                : "p-2 border border-gray-300  rounded-lg mb-4 font-semibold focus:outline-none focus:border-gray-600"
            }
          >
            Submit
          </button>
          <Link href={"/login"}>Login here</Link>
          
        </div>
      </div>
    );
}