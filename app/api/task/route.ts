import { Users } from "@/lib/user.model";
import { connections } from "@/lib/db";
import { NextResponse } from "next/server";
import { Tasks } from "@/lib/task.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Response) {
    try {
        const {id , title,detail} = await req.json();
        
        if(!title || !detail )
            return NextResponse.json({message:"fields are empty"})

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connections();

        const user = await Users.findById(session.user.id).select("-password");

        const task = await Tasks.create({
            user: user._id,
            title:title,
            detail:detail
        })
        user.task.push(task._id);
        await user?.save();
        return NextResponse.json({message: "DONE"})
    } 
    catch (error) {
        return NextResponse.json(error)
    }
}

export async function UPDATE(req: Request)
{
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const {_id,title,detail}= req.json()
    await connections();

    if(!title || !detail )
        return NextResponse.json({message:"fields are empty"})
    const newTask = await Tasks.findOneAndUpdate({Tasks._id : _id},{title:title},{detail:detail})
    if(!newTask)
    {
        return NextResponse.json({message: "task not exist"})

    }
}
