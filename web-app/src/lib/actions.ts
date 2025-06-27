"use server";

import { signIn } from "@/lib/auth";

export async function Login() {
  try {
    const signedIn = await signIn();
    console.log("signedIn:", await signedIn);
    return signedIn;
  } catch (error) {
    console.log("Login failed:", await error);
    return error;
  }
}
