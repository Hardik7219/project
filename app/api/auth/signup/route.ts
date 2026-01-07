import { connections } from "@/lib/db";
import { Users } from "@/lib/user.model";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const { userName, email, password } = await req.json();

  if (!userName || !email || !password) {
    return Response.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (password.length < 6) {
    return Response.json(
      { error: "Password must be at least 6 characters" },
      { status: 400 } 
    );
  }

  await connections();

  const exists = await Users.findOne({ email });
  if (exists) {
    return Response.json(
      { error: "User already exists" },
      { status: 400 }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await Users.create({
    userName,
    email,
    password: hashedPassword,
  });

  return Response.json({ message: "User created successfully" });
}
