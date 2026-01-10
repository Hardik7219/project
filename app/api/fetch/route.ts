import {Users} from '@/lib/user.model'
import {connections} from '@/lib/db'
import fs from 'fs/promises'
import path from 'path'
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Tasks } from "@/lib/task.model";
export async function GET()
{
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connections();

    const user = await Users.findById(session.user.id).select("-password");

    const tasks= await Tasks.find({ user : session.user.id })


    return NextResponse.json({user,tasks,});
}



export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const userName = formData.get("userName") as string | null;
  const email = formData.get("email") as string | null;
  const avatarFile = formData.get("avatar") as File | null;

  await connections();

  const updateData: any = {};

  if (userName) updateData.userName = userName;
  if (email) updateData.email = email;

  if (avatarFile) {
    if (!avatarFile.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "Only images allowed" },
        { status: 400 }
      );
    }

    const bytes = await avatarFile.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/avatar");
    await fs.mkdir(uploadDir, { recursive: true });

    const fileName = `${session.user.id}-${Date.now()}.png`;
    const filePath = path.join(uploadDir, fileName);

    await fs.writeFile(filePath, buffer);

    updateData.avatar = `/avatar/${fileName}`;
  }

  if (Object.keys(updateData).length === 0) {
    return NextResponse.json(
      { message: "No data to update" },
      { status: 400 }
    );
  }

  const user = await Users.findByIdAndUpdate(
    session.user.id,
    updateData,
    { new: true }
  );

  return NextResponse.json({
    message: "Profile updated",
    user
  });
}