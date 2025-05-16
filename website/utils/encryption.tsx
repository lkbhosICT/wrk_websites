import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CRYPTO_KEY || "");
const iv = CryptoJS.enc.Utf8.parse(process.env.NEXT_PUBLIC_CRYPTO_IV || "");

export function encryptAES(text: string): string {
  if (!process.env.NEXT_PUBLIC_CRYPTO_KEY || !process.env.NEXT_PUBLIC_CRYPTO_IV) {
    throw new Error("Missing CRYPTO_KEY or CRYPTO_IV environment variables.");
  }

  return CryptoJS.AES.encrypt(text, key, {
    iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  }).toString();
}
