"use server";

import { signIn } from "@/lib/auth";

export async function Login() {
  try {
    const signedIn = await signIn();
    return signedIn;
  } catch (error) {
    return error;
  }
}
