import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import bcryptjs from 'bcryptjs'

connect()
export async function POST(request:NextRequest) {
    try {
        const reqBody = await request.json()
        const {password, confirmPassword, token} = reqBody
        
        if (!password && !confirmPassword) {
            return NextResponse.json({error: "password is required"}, {status: 400})
        }
    

        const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        
        if(!user) {
            return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }
    
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)
    
        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordTokenExpiry = undefined
    
        await user.save()
    
        return NextResponse.json({
            message: "Password reset successfull",
            success: true
        })
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }

}