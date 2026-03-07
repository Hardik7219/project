import { connections } from "@/lib/db";
import { Users } from "@/lib/user.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Tasks } from "@/lib/task.model";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "something went wrong" },
        { status: 400 })
    try {
        await connections();
        const user = await Users.findById(session.user.id);

        if (!user) return NextResponse.json("User not fount");
        const tasks = await Tasks.find({ user: session.user.id })

        const today = new Date();
        today.setHours(0, 0, 0, 0)
        for (const task of tasks) {
            if (!task.isTaskRepe) continue

            const last = new Date(task.taskDate);
            last.setHours(0,0,0,0);

            if (task.isTaskRepe === "daily") {
                if (last < today) {
                    task.isTaskDone = false;
                    task.taskDate = today;
                    await task.save();
                }
            }
            if (task.isTaskRepe === "weekly") {
                const diffdays = (today.getTime() - last.getTime()) / (1000 * 60 * 60 * 24)
                if (diffdays >= 7) {
                    task.isTaskDone = false
                    task.taskDate = today;
                    await task.save();
                }
            }
            if (task.isTaskRepe === "monthly") {
                const lastMonth = last.getMonth()
                const currentMonth = today.getMonth()

                const lastYear = last.getFullYear()
                const currentYear = today.getFullYear()

                if (lastYear < currentYear || lastMonth < currentMonth) {
                    task.isTaskDone = false
                    task.taskDate = today
                    await task.save()
                }
            }
        }
        const startDate = new Date()
        startDate.setHours(0, 0, 0, 0);
        const endDate = new Date()
        endDate.setHours(23, 59, 59, 999)
        const task = await Tasks.find({
            user: session.user.id,
            taskDate: { $gte: startDate, $lte: endDate }
        })

        if(!task)return NextResponse.json("There is no task")
        else return NextResponse.json(task);
    } catch (error) {
        return NextResponse.json(error)
    }
}