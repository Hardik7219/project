import { Users } from "@/lib/user.model";
import { connections } from "@/lib/db";
import { NextResponse } from "next/server";
import { Tasks } from "@/lib/task.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Response) {
    try {
        const {id , title,detail} = await req.json();
        

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


