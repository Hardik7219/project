import {Users} from '@/lib/user.model'
import {connections} from '@/lib/db'
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { Achivs } from "@/lib/achiv.model";
import cloudinary from '@/lib/cloudinary';
import streamifier from "streamifier";


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

    const user  = await Users.findById(session.user.id).select("-password");
    let achivs
    if(date && star)
      achivs = await Achivs.find({user : session.user.id , createDate : new Date(date),isStar : star})
    else if(date)
      achivs = await Achivs.find({user : session.user.id , createDate : new Date(date)})
    else if(star)
      achivs = await Achivs.find({user : session.user.id ,isStar : star})
    else
      achivs= await Achivs.find({ user : session.user.id });
    return NextResponse.json({user,achivs});
}


export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();

  const userName = formData.get("userName") as string | null;
  const avatarFile = formData.get("avatar") as File | null;

  await connections();

  const updateData: any = {};

  if (userName) updateData.userName = userName;

  if (avatarFile) {
  if (!avatarFile.type.startsWith("image/")) {
    return NextResponse.json(
      { message: "Only images allowed" },
      { status: 400 }
    );
  }
  if (avatarFile.size > 2 * 1024 * 1024) {
  return NextResponse.json(
    { message: "Image must be under 2MB" },
    { status: 400 }
  );
}

try{
const buffer = Buffer.from(await avatarFile.arrayBuffer());

const uploadResult = await new Promise<any>((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "avatars",
      public_id: `${session.user.id}-${Date.now()}`,
      resource_type: "image",
    },
    (error, result) => {
      if (error) return reject(error);
      resolve(result);
    }
  );

  streamifier.createReadStream(buffer).pipe(uploadStream);
});

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
  ).select("-password");

  return NextResponse.json({
    message: "Profile updated",
    user,
  });
}
