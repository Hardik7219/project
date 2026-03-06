import { connections } from "@/lib/db";
import { Users } from "@/lib/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Tasks } from "@/lib/task.model";
import { NextResponse } from "next/server";

export async function GET(req: Request)
{
    const session = await getServerSession(authOptions);
    if(!session) return NextResponse.json({ error: "something went wrong" },
            { status: 400 })
    try {
        await connections();
        const user = await Users.findById(session.user.id);
        if(!user) return NextResponse.json("User not fount");

        const task = await Tasks.find({
            user: session.user.id
        })
        console.log(task)
        if(!task) return NextResponse.json("There is no task")
        else return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(error)
    }
}