import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

import {connections} from '@/lib/db';

import {Users} from '@/lib/user.model';
import { error } from "console";
import { userAgent } from "next/server";


const handler = NextAuth({
    providers: [
        Credentials({
            name: "Credentials",
            credentials:{
                userName :{label:"UserName",type:"text"},
                email :{ label:"Email",type :"email"},
                password :{label: "Password" , type : "password"},
            },
         async authorize(credentials){
            if(!credentials?.email || !credentials.password || !credentials.userName)
                throw new Error("missing credentials");
         }

        await connections();

        const user = await Users.findOne({email : credentials.email });
        if(!user) throw new Error("user not found");

        const ok = await bcrypt.compare(
            credentials.password,
            user.password

        );
        if(!ok) throe new Error("Password invalid");
        return {
            id:userAgent._id.toString(),
            userName:user.userName,
            email:user.email,
        };

        }),
    ],
    session:{
        strategy:'jwt',
    },
    secret: process.env.JWT_TOKEN,
});

export { handler as GET, handler as POST}