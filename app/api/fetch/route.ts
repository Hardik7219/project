import NextAuth from "next-auth";
import {Users} from '@/lib/user.model'
import {connections} from '@/lib/db'
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET()
{
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connections();

    const user = await Users.findById(session.user.id).select("-password");

    return NextResponse.json(user);
}
