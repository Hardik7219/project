import { Tasks } from "@/lib/task.model";
import { connections } from "@/lib/db";
import { Users } from "@/lib/user.model";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        const formData = await req.formData();
        const taskName = formData.get("taskName") as string;
        const taskDetail = formData.get("taskDetail") as string;
        const isTaskRepe = formData.get("isTaskRepe") as string;
        await connections();
        const user1 = await Users.findById(session.user.id);
        if (!user1) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const createTask :any = {}
        if(user1) createTask.user= user1._id
        if(taskName) createTask.taskName = taskName;
        if(taskDetail) createTask.taskName = taskDetail;
        if(isTaskRepe) createTask.isTaskRepe = isTaskRepe;
        // if(!isTaskRepe) isTaskRepe="oneTime";
        const task = await Tasks.create(createTask)
        user1.task.push(task._id)
        await user1.save();
        if (task)
            return NextResponse.json("task added")
        else
            return NextResponse.json("something happend")
    } catch (error) {
        return NextResponse.json({ error })
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        const {id,isTaskDone, isTaskRepe} = await req.json();
        await connections();
        const user1 = await Users.findById(session.user.id);
        if (!user1) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const task = await Tasks.findOne({_id:id, user:user1._id})
        if(!task) return NextResponse.json({message:"Task not found" , status : 401})
        const updateData : any={}  
        if(isTaskDone !== undefined)
        {
            updateData.isTaskDone = isTaskDone;
            if(isTaskDone===true)
            {

                const completeDate = new Date()
                completeDate.setHours(0,0,0,0)
                updateData.taskCompletDate=completeDate;
               const today = new Date()
today.setHours(0,0,0,0)

if(task.taskCompletDate)
{
    const last = new Date(task.taskCompletDate)
    last.setHours(0,0,0,0)

    const yesterday = new Date(today)
    yesterday.setDate(today.getDate() - 1)

    if(last.getTime() === yesterday.getTime())
    {
        updateData.streak = task.streak + 1
    }
    else if(last.getTime() === today.getTime())
    {
        updateData.streak = task.streak
    }
    else
    {
        updateData.streak = 1
    }
}
else
{
    updateData.streak = 1
}
            }
            else{
                updateData.taskCompletDate = null;
            }
        } 
        if(isTaskRepe !==undefined)
        {
            updateData.isTaskRepe = isTaskRepe;
        } 
        const UpdateTask = await Tasks.findByIdAndUpdate(id,
            updateData,
            {
                new: true,
                lean: true
            }
        )
        if (UpdateTask) return NextResponse.json("checked")
        else return NextResponse.json("something is wrong")
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }
    try {
        const formData = await req.formData();
        const taskName = formData.get("taskName") as string;
        const taskDetail = formData.get("taskDetail") as string;
        const taskId = formData.get("_id");
        await connections();
        const user1 = await Users.findById(session.user.id);
        if (!user1) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const task = await Tasks.findById({ _id: taskId })
        if (!task) return NextResponse.json("task not found ")
        const updateData: any = {};

        if (taskName) updateData.taskName = taskName;
        if (taskDetail) updateData.taskDetail = taskDetail;


        const updatedTask = await Tasks.findByIdAndUpdate(
            taskId,
            updateData,
            { new: true }
        );

        if (updatedTask) {
            return NextResponse.json({ message: "Task Updated" });
        }
        else {
            return NextResponse.json({ message: "Update failed" });
        }
    } catch (error) {
        return NextResponse.json(error)
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }
        const {deleteId} = await req.json()
        await connections();
        const user1 = await Users.findById(session.user.id);
        if (!user1) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        const task = await Tasks.findById(deleteId)
        if (!task) return NextResponse.json({message:"task not found"})
        
        const deleteTask = await Tasks.findOneAndDelete({
            _id: deleteId,
            user: user1._id
        });
        if(deleteTask)
        {
            await Users.findByIdAndUpdate(user1._id,{
                $pull:{ task: deleteId }
            })
            return NextResponse.json({message: "task deleted"})
        } 
        else return NextResponse.json({message:"something went wrong"})
    } catch (error) {
        return NextResponse.json({message:error})
    }
}