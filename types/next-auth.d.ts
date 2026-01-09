import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email?: string | null;
      userName?: string | null;
    };
  }

  interface User {
    id: string;
    userName:string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    userName:string;
  }
}
