export const decrypt = async (ciphertext: ArrayBuffer): Promise<any> => {
  try {
    const pemPrivateKey = process.env.PRIVATE_KEY ?? "";
    const header = "-----BEGIN PRIVATE KEY-----";
    const footer = "-----END PRIVATE KEY-----";
    const contents = pemPrivateKey
      .replace(header, "")
      .replace(footer, "")
      .replace(/\s/g, "");
    const binary = Uint8Array.from(atob(contents), (c) => c.charCodeAt(0));
    const privateKey = await crypto.subtle.importKey(
      "pkcs8",
      binary.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["decrypt"]
    );
    const decrypted = await crypto.subtle.decrypt(
      { name: "RSA-OAEP" },
      privateKey,
      ciphertext
    );
    const decoder = new TextDecoder();
    const decoded = decoder.decode(decrypted);
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decrypting data", error);
  }
};
