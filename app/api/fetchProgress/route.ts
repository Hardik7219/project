import { connections } from "@/lib/db";
import { Users } from "@/lib/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Tasks } from "@/lib/task.model";
import { Achivs } from "@/lib/achiv.model";
import { NextResponse } from "next/server";

export async function GET(req:Request)
{
    const session = await getServerSession(authOptions)
    if(!session) return NextResponse.json(
        { message: "Unauthorized user" },
        { status: 401 }
    );
    try {
        await connections();
        const user = await Users.findById(session.user.id)
        if(!user) return NextResponse.json({message:"User not found",status:404})
        
        const achivCount = await Achivs.countDocuments({ user: user._id });
        const taskCount = await Tasks.countDocuments({ user: user._id });
        const maxStreakDaily = await Tasks
        .countDocuments({ user: user._id, isTaskRepe: "daily" })
        .sort({ streak: -1 })
        .select("streak name")
        .lean();
        const starAchiv= await Achivs.countDocuments({user:user._id,isStar:true});
        const start = new Date();
        start.setHours(0,0,0,0);

        const end = new Date();
        end.setHours(23,59,59,999);

        const completTask = await Tasks.findOne({
        user: user._id,
        isTaskDone: true,
        taskCompletDate: {
            $gte: start,
            $lte: end
        }
        });
        const weeklyCompletTask= await Tasks.findOne({user: user._id,isTaskRepe : "weekly", streak : {$gt : 1}});
    
        
        return NextResponse.json({achivCount,taskCount,maxStreakDaily,starAchiv,completTask,weeklyCompletTask});
    } catch (error) {
        return NextResponse.json({message : error});
    }
}