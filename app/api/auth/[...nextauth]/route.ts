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
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials : any) : Promise<any> {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email and password required");
            }

            await connections();

            const user = await Users.findOne({ email: credentials.email });

            if (!user) {
            throw new Error("User not exist");
            }

            if (!user.password) {
            throw new Error("User password missing");
            }

            const isLogin = await bcrypt.compare(
            credentials.password,
            user.password
            );

            if (!isLogin) {
            throw new Error("Password is wrong");
            }

            return {
            id: user._id.toString(),
            email: user.email,
            name: user.userName,
            };
        },
})

    ],
    session: {
        strategy:"jwt"
    },
    pages: {
        signIn : "/login"
    },
    callbacks: {
    async jwt({ token, user}) {
    if (user) {
        token.id = user.id;
        token.userName = user.userName;
        token.avatar=user.avatar;
    }
    if (!token.id) {
        return token;
    }
    await connections();

    const dbUser = await Users.findById(token.id);

    if (dbUser) {
        token.userName = dbUser.userName;
        token.avatar= dbUser.avatar;
    }
    


    return token;
},

    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            session.user.userName = token.userName;
            session.user.avatar = token.avatar;
        }
        return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};