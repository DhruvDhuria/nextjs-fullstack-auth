"use client"

import React, {useEffect, useState} from "react"
import axios from "axios"

export default function ResetPassword() {
    const [email, setEamil] = useState("")
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false)
    const sentEmail = async () => {
        try {
            setLoading(true)
            await axios.post('/api/users/resetpassword', {email} )

        } catch (error: any) {
            console.log(error.response.data)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
      if (email.length > 0) {
        setButtonDisabled(false)
      } else {
        setButtonDisabled(true)
      }
    })

    return (
      <div className="flex flex-col font-sans items-center justify-center min-h-screen py-2">
        <div className="flex flex-col items-center justify-center border border-white px-8 py-4 rounded-xl">
          <h1 className="text-xl font-bold mb-2">{loading ? "Processing" : "Reset Password"}</h1>
          <label htmlFor="email">Email</label>
          <input
            className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEamil(e.target.value)}
            placeholder="Email"
          />
          <button
            className={
              buttonDisabled
                ? "p-2 border border-gray-300 rounded-lg mb-4 font-semibold text-gray-500 focus:outline-none focus:border-gray-600"
                : "p-2 border border-gray-300  rounded-lg mb-4 font-semibold focus:outline-none focus:border-gray-600"
            }
            type="submit"
            onClick={sentEmail}
          >
            Submit
          </button>
        </div>
      </div>
    );
}