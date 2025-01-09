import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";
import { sendEmail } from "@/helpers/mailer";

connect()

export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody

        if (!email) {
            return NextResponse.json({error: "Email is required"}, {status: 400})
        }

        const user = await User.findOne({email})
        
        if (!user) {
            return NextResponse.json({error: "User not found"}, {status: 404})
        }

        await sendEmail({email, emailType: "RESET", userId: user._id})

        return NextResponse.json({message: "Email sent succesfully", success: true})

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}