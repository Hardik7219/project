'use client'

import AchievementSection from "@/components/achievementSection/achievement/AchievementSection";
import TaskSection from "@/components/taskSection/task/TaskSection"
import ProgressSection from "@/components/progressSection/ProgressSection/ProgressSection";
import { useState } from "react";


export default function MainHome() {

    const Feature={
        Achive:<AchievementSection></AchievementSection>,
        Task:<TaskSection></TaskSection>,
        Progress:<ProgressSection></ProgressSection>
    }
    const [sec,setSec]=useState<any>(Feature.Progress); 
    return (
        <>
            <div className="w-full bg-gray-950 min-h-screen ">
                <div className="flex p-3 items-center">
                    <div className="flex gap-5">
                        <button className="border-indigo-500 hover:border-white p-2 m-1 rounded-lg  ease-in-out border-2 text-cyan-400 " onClick={()=>setSec(Feature.Achive)}>Achievement</button>
                        <button className="border-indigo-500 hover:border-white p-2 m-1 rounded-lg  ease-in-out border-2 text-cyan-400 " onClick={()=>setSec(Feature.Task)}>Task</button>
                        <button className="border-indigo-500 hover:border-white p-2 m-1 rounded-lg  ease-in-out border-2 text-cyan-400 " onClick={()=>setSec(Feature.Progress)}>Progress</button>
                    </div>
                </div>
                    {sec}
            </div>
        </>
    );
}