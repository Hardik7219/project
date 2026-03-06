'use client'

import AchievementSection from "@/components/achievementSection/achievement/AchievementSection";
import TaskSection from "@/components/taskSection/task/TaskSection"
import { useState } from "react";

export default function MainHome() {

    const Feature={
        Achive:<AchievementSection></AchievementSection>,
        Task:<TaskSection></TaskSection>,
        Progress:""
    }
    const [sec,setSec]=useState<any>(Feature.Task); 
    return (
        <>
            <div className="w-full bg-gray-950 min-h-screen ">
                <div className="flex justify-center items-center">
                    <div className="flex gap-5">
                        <button className="bg-yellow-300 border-2" onClick={()=>setSec(Feature.Achive)}>Achievement</button>
                        <button className="bg-yellow-300 border-2" onClick={()=>setSec(Feature.Task)}>Task</button>
                        <button className="bg-yellow-300 border-2">Progress</button>
                    </div>
                </div>
                    {sec}
            </div>
        </>
    );
}