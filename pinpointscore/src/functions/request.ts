import axios from "axios";
import { encrypt, decrypt } from "./security";

export const postRequest = async (endpoint: string, body: unknown) => {
  try {
    const base = import.meta.env.VITE_BASE_API_URL ?? "";
    const proxy = import.meta.env.VITE_PROXY_URL ?? "";
    const payload = { base: base, endpoint: endpoint, body: body };
    const encrypted = await encrypt(payload);
    if (!encrypted) {
      throw new Error("Encryption failed");
    }
    const ciphertext = encrypted;
    const decrypted_content = await decrypt(ciphertext);
    console.log("-----ciphertext", ciphertext);
    console.log("-----decrypted_content", decrypted_content);
    const { data } = await axios.post(proxy, ciphertext, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    console.log("Error posting request", error);
    return error;
  }
};

// import axios from "axios";

// import { encrypt } from "./security";

// export const postRequest = async (endpoint: string, body: unknown) => {
//   try {
//     const base = import.meta.env.VITE_BASE_API_URL ?? "";
//     const proxy = import.meta.env.VITE_PROXY_URL ?? "";
//     const payload = { base: base, endpoint: endpoint, body: body };
//     const encrypted = await encrypt(payload);
//     const { data } = await axios.post(proxy, encrypted, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//     return data;
//   } catch (error) {
//     console.log("Error posting request", error);
//     return error;
//   }
// };
