import { Users } from "@/lib/user.model";
import { connections } from "@/lib/db";
import { NextResponse } from "next/server";
import { Tasks } from "@/lib/task.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { JWT } from "next-auth/jwt";


export async function POST(req: Request) {
    try {
        const {user , title,detail} = await req.json();
        
        if(!title || !detail )
            return NextResponse.json({message:"fields are empty"})

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await connections();

        const user1 = await Users.findById(session.user.id).select("-password");

        const task = await Tasks.create({
            user: user1._id,
            title:title,
            detail:detail
        })
        user1.task.push(task._id);
        await user1.save();
        if(task)
            return NextResponse.json({message:"Task ADD"})
    } 
    catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req: Request)
{
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, title, detail } = await req.json();
    await connections();

    if (!id || !title || !detail) {
        return NextResponse.json(
            { message: "Fields are empty" },
            { status: 400 }
        );
    }

    const updatedTask = await Tasks.findByIdAndUpdate(
        id,
        { title, detail },
        {
            new: true,
            lean: true
        }
    );

    if (!updatedTask) {
        return NextResponse.json(
            { message: "Task not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ message: "Updated successfully", updatedTask });
}


export async function DELETE(req: Request)
{
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {id} = await req.json();
    await connections();

    const deleteTask = await Tasks.findByIdAndDelete({_id:id,user:session.user.id})

        if (!deleteTask) {
        return NextResponse.json(
            { message: "Task not found" },
            { status: 404 }
        );
    }
    return NextResponse.json({message:"delete",deleteTask})
}

export async function PATCH(req : Request)
{
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, isDone } = await req.json();
    await connections();

    const isTask = await Tasks.findByIdAndUpdate(id,
        {
            isDone:isDone
        },  
        {
            new: true,
            lean: true
        })
        if(!isTask)
        {
            return NextResponse.json({ message: "Task not found" }, { status: 404 });
        }
        return Response.json({message:"task tick"});

}