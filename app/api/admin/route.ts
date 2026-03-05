import { Users } from "@/lib/user.model";
import { Achivs } from "@/lib/achiv.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { connections } from "@/lib/db";

export async function GET(req : Request)
{
    try {
        const session = await getServerSession(authOptions);
        if(session?.user.role !=="admin")
        {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        await connections();
        const userData = await Users.countDocuments();
        const achiData = await Achivs.countDocuments();
        return NextResponse.json({userData,achiData})
    }
    catch (error) {
        return NextResponse.json({error})
    }
}