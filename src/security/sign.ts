import crypto from "crypto";

const SECRET = process.env.QR_SECRET || "MY_SUPER_SECRET_KEY";

export function signQR(data: object): string {
  return crypto
    .createHmac("sha256", SECRET)
    .update(JSON.stringify(data))
    .digest("hex");
}

export function verifyQR(data: object, signature: string): boolean {
  return signQR(data) === signature;
}