import { Users } from '@/lib/user.model'
import { connections } from '@/lib/db'
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import cloudinary from '@/lib/cloudinary';
import streamifier from "streamifier";

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

        try {
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

            updateData.avatar = uploadResult.secure_url;
        } catch (error) {
            console.error("Cloudinary upload error:", error);
            return NextResponse.json(
                { message: "Image upload failed" },
                { status: 500 }
            );
        }
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
