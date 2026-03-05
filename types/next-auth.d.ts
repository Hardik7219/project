import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName?: string | null;
      avatar?: string | null;
      role ? : string | null;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    email?: string | null;
    userName?: string | null;
    avatar?: string | null;
    role ?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    userName?: string;
    avatar?: string;
    role?:string;
  }
}
