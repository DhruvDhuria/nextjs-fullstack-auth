import { connect } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
import { error } from "console";


connect()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email, password} = reqBody;
        console.log(reqBody)

        if(!email && !password) {
            return NextResponse.json({error: "Email and password is required"}, {status: 400})
        }

        // check if user exists
        const user = await User.findOne({email})

        if(!user) {
            return NextResponse.json({error: "User does not exists"}, {status: 400})
        }
        const validPassword = await bcryptjs.compare(password, user.password)

        if (!validPassword) {
            return NextResponse.json({error: "Password is invalid"}, {status: 400})
        }

        // create token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        // create token

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

        const response = NextResponse.json({message: "Login successful", success: true})

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}