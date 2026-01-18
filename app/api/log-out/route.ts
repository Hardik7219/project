import { signOut } from "next-auth/react";
import { NextResponse } from "next/server";

export async function GET() {
  await signOut({ redirect: false });
  return NextResponse.redirect(new URL("/"));
}   