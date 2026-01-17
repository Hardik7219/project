import { Users } from "@/lib/user.model";
import { connections } from "@/lib/db";
import { NextResponse } from "next/server";
import { Achivs } from "@/lib/achiv.model";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";


export async function POST(req: Request) {
    try {
        const { title, detail } = await req.json();

        if (!title || !detail) {
            return NextResponse.json(
                { message: "Fields are empty" },
                { status: 400 }
            );
        }

        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        await connections();

        const user1 = await Users.findById(session.user.id);
        if (!user1) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        const achiv = await Achivs.create({
            user: [user1._id],
            title,
            detail
        });

        user1.achiv.push(achiv._id);
        await user1.save();

        return NextResponse.json(
            { message: "Achievement added", achiv },
            { status: 201 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
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

    const updatedAchiv = await Achivs.findByIdAndUpdate(
        id,
        { title, detail },
        {
            new: true,
            lean: true
        }
    );

    if (!updatedAchiv) {
        return NextResponse.json(
            { message: "Achievement not found" },
            { status: 404 }
        );
    }

    return NextResponse.json({ message: "Updated successfully", updatedAchiv });
}


export async function DELETE(req: Request)
{
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const {id} = await req.json();
    await connections();

    const deleteAchiv = await Achivs.findByIdAndDelete({_id:id,user:session.user.id})

        if (!deleteAchiv) {
        return NextResponse.json(
            { message: "Achievement not found" },
            { status: 404 }
        );
    }
    return NextResponse.json({message:"delete",deleteAchiv})
}

export async function PATCH(req : Request)
{
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, isStar } = await req.json();
    await connections();

    const isAchiv = await Achivs.findByIdAndUpdate(id,
        {
            isStar:isStar
        },  
        {
            new: true,
            lean: true
        })
        if(!isAchiv)
        { 
            return NextResponse.json({ message: "Achievement not found" }, { status: 404 });
        }
        return Response.json({message:"Achievement is now Star"});

}