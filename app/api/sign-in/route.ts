import {Users} from "@/lib/user.model";
import {connections} from '@/lib/db';
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request)
{
    try {
        const {userName,email,password} = await req.json();

        if (!userName || !email || !password) {
            return NextResponse.json(
                { message: "All fields required" },
                { status: 400 }
            );
        }
        if(password.length<6)
        {
            return NextResponse.json(
                { message: "password should atleast 6 letter" },
                { status: 400 }
            );
        }
        await connections();
        const user = await Users.findOne({email})
        if(user)
        {
            return NextResponse.json(
                { message: "user exist" },
                { status: 400 }
            );
        }
        const hasPassword = await bcrypt.hash(password,10)

        await Users.create({
            userName,
            email,
            password:hasPassword,
        })
        return NextResponse.json({message: "DONE"})

    } catch (error) {
        return NextResponse.json(error)
    }
}