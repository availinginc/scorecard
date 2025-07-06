export const encrypt = async (
  payload: object
): Promise<ArrayBuffer | undefined> => {
  try {
    const pemPublicKey = import.meta.env.VITE_PUBLIC_KEY ?? "";
    const pemHeader = "-----BEGIN PUBLIC KEY-----";
    const pemFooter = "-----END PUBLIC KEY-----";
    const pemContents = pemPublicKey
      .replace(pemHeader, "")
      .replace(pemFooter, "")
      .replace(/\s/g, "");
    const binaryDer = Uint8Array.from(window.atob(pemContents), (c) =>
      c.charCodeAt(0)
    );
    const publicKey = await window.crypto.subtle.importKey(
      "spki",
      binaryDer.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["encrypt"]
    );
    const encoder = new TextEncoder();
    const encoded = encoder.encode(JSON.stringify(payload));
    const ciphertext = await window.crypto.subtle.encrypt(
      { name: "RSA-OAEP" },
      publicKey,
      encoded
    );
    return ciphertext;
  } catch (error) {
    console.error("Error encrypting data", error);
  }
};

export const decrypt = async (ciphertext: ArrayBuffer): Promise<any> => {
  try {
    const pemPrivateKey = import.meta.env.VITE_PRIVATE_KEY ?? "";
    const pemHeader = "-----BEGIN PRIVATE KEY-----";
    const pemFooter = "-----END PRIVATE KEY-----";
    const pemContents = pemPrivateKey
      .replace(pemHeader, "")
      .replace(pemFooter, "")
      .replace(/\s/g, "");
    const binaryDer = Uint8Array.from(window.atob(pemContents), (c) =>
      c.charCodeAt(0)
    );
    const privateKey = await window.crypto.subtle.importKey(
      "pkcs8",
      binaryDer.buffer,
      {
        name: "RSA-OAEP",
        hash: "SHA-256",
      },
      false,
      ["decrypt"]
    );
    const decrypted = await window.crypto.subtle.decrypt(
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

export const generate = async () => {
  try {
    const keyChain = { public: "", private: "" };
    const keyPair = await window.crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 4096,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: "SHA-256",
      },
      true,
      ["encrypt", "decrypt"]
    );

    // Extract Public
    const exportedPublic = await window.crypto.subtle.exportKey(
      "spki",
      keyPair.publicKey
    );
    const exportedPublicAsString = String.fromCharCode(
      ...new Uint8Array(exportedPublic)
    );
    const exportedPublicAsBase64 = window.btoa(exportedPublicAsString);
    keyChain["public"] =
      `-----BEGIN PUBLIC KEY-----\n${exportedPublicAsBase64}\n-----END PUBLIC KEY-----`;

    // Extract Private
    const exportedPrivate = await window.crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey
    );
    const exportedPrivateAsString = String.fromCharCode(
      ...new Uint8Array(exportedPrivate)
    );
    const exportedPrivateAsBase64 = window.btoa(exportedPrivateAsString);
    keyChain["private"] =
      `-----BEGIN PRIVATE KEY-----\n${exportedPrivateAsBase64}\n-----END PRIVATE KEY-----`;

    return keyChain;
  } catch (error) {
    console.error("Error generating keys", error);
  }
};
