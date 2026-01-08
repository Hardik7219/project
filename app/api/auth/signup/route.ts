import {connections} from '@/lib/db';
import {Users} from '@/lib/user.model';
import bcrypt from 'bcrypt';

export async function POST(req : Request)
{
    const {userName,email,password} = await req.json();

    if(!userName || !email || !password)
    {
        return Response.json(
            {error : "ALL field required"},
            {status:400}
        );
    }
    if (password.length < 6) {
        return Response.json(
            { error: "Password must be at least 6 characters" },
            { status: 400 }
        );
    }

    await connections();

    const isUserExist = await Users.findOne({email})
    if(isUserExist)
    {
        return Response.json(
            { error: "User already exists" },
            { status: 400 }
        );
    }


    const hashPassword = await bcrypt.hash(password,10);
    
    await Users.create({
        userName,
        email,
        password : hashPassword
    })
    return Response.json({ message: "User created successfully" });
}
