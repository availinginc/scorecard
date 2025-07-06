export const encrypt = async (payload: object) => {
  try {
    const key = await window.crypto.subtle.generateKey(
      {
        name: "AES-CTR",
        length: 256,
      },
      true,
      ["encrypt", "decrypt"]
    );
    const counter = window.crypto.getRandomValues(new Uint8Array(16));
    const encoder = new TextEncoder();
    const json = JSON.stringify(payload);
    const data = encoder.encode(json);
    const ciphertext = await window.crypto.subtle.encrypt(
      {
        name: "AES-CTR",
        counter,
        length: 64,
      },
      key,
      data
    );
    return { ciphertext, counter, key };
  } catch (error) {
    console.log("Error encrypting data", error);
  }
};

export const decrypt = async (
  ciphertext: ArrayBuffer,
  counter: Uint8Array,
  key: CryptoKey
) => {
  try {
    const decrypted = await window.crypto.subtle.decrypt(
      {
        name: "AES-CTR",
        counter,
        length: 64,
      },
      key,
      ciphertext
    );
    const decoder = new TextDecoder();
    const json = decoder.decode(decrypted);
    return JSON.parse(json);
  } catch (error) {
    console.log("Error decrypting data", error);
  }
};
