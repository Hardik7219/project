import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import {connections} from '@/lib/db'
import {Users} from '@/lib/user.model'
import NextAuth from "next-auth";

export const authOptions : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials : any) : Promise<any>
            {
                await connections();
                try {

                    const user = await Users.findOne({ email :credentials.email})

                    if(!user) throw new Error("User not exist");

                    const isLogin= await bcrypt.compare(credentials.password,user.password)

                    if(!isLogin) throw new Error("password is wrong");

                    else{
                        return {
                            id: user._id.toString(),
                            email: user.email,
                            userName: user.userName,
                    }
                    }
                } catch (error) {
                    throw new Error(error);
                }
            }
        })
    ],
    session: {
        strategy:"jwt"
    },
    pages: {
        signIn : "/login"
    },
    callbacks: {
    async jwt({ token, user }) {
        if (user) {
            token.id = user.id;
        }
        return token;
    },

    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
        }
        return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};