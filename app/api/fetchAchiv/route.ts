import {connections} from '@/lib/db'
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Achivs } from "@/lib/achiv.model";



export async function GET(req : Request)
{
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const date = searchParams.get("date");
    const starParam = searchParams.get("star"); 
    const star = starParam === "true";          

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connections();
    let achivs
    if(date && star)
      achivs = await Achivs.find({user : session.user.id , createDate : new Date(date),isStar : star})
    else if(date)
      achivs = await Achivs.find({user : session.user.id , createDate : new Date(date)})
    else if(star)
      achivs = await Achivs.find({user : session.user.id ,isStar : star})
    else
      achivs= await Achivs.find({ user : session.user.id });
    return NextResponse.json({achivs});
}