import axios from "axios";

import { encrypt, envelope } from "./security";

export const postRequest = async (endpoint: string, body: unknown) => {
  try {
    const base = import.meta.env.VITE_BASE_API_URL ?? "";
    const proxy = import.meta.env.VITE_PROXY_URL ?? "";
    const payload = { base: base, endpoint: endpoint, body: body };
    console.log("----payload", payload);
    const encrypted = await encrypt(payload);
    if (!encrypted) {
      throw new Error("Encryption failed");
    }
    console.log("----encrypted", encrypted);
    const packaged = await envelope(encrypted);
    console.log("----packaged", packaged);
    const { data } = await axios.post(
      proxy,
      { encrypted: packaged },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    return error;
  }
};
