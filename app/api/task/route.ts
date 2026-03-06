import { Tasks } from "@/lib/task.model";
import { connections } from "@/lib/db";
import { Users } from "@/lib/user.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
export async function POST(req : Request)
{
    const session = await getServerSession(authOptions);
    if(!session)
    {
        return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
    }
    try {
        const formData = await req.formData();
        const taskName = formData.get("taskName") as string;
        const taskDetail = formData.get("taskDetail") as string ;
        const isTaskRepe = formData.get("isTaskRepe") === "true";
        console.log(session.user.id);
        await connections();
        const user1 = await Users.findById(session.user.id);
        if(!user1) 
        {
            return NextResponse.json(  { error: "User not found" },{ status: 404 });
        }
                
        const task = await Tasks.create({
            user : [user1._id],
            taskName:taskName,
            taskDetail:taskDetail,
            isTaskRepe:isTaskRepe,
        })
        user1.task.push(task._id)
        await user1.save();
        if(task)
            return NextResponse.json("task added")
        else
            return NextResponse.json("something happend")
    } catch (error) {
        return NextResponse.json({error})
    }
}