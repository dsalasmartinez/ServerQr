import QRCode from "qrcode";
import { signQR } from "../security/sign";

// export async function generateLoanQR(data: {
//   loanId: string;
//   customerName: string;
//   paidDate: string;
// }) {
//   const sig = signQR(data);

//   const payload = {
//     ...data,
//     sig
//   };

//   return QRCode.toDataURL(JSON.stringify(payload)); // PNG Base64
// }

export async function generateLoanQR(data: {
  loanId: string;
  customerName: string;
  customerSurName: string;
  firstQuotaDate: string;
  originalAmount: number;
  identification: string;
}) {
  const sig = signQR(data);

  const token = Buffer
    .from(JSON.stringify({ ...data, sig }))
    .toString("base64url");

  // const url = `http://192.168.1.117:5024/api/qr/view?t=${token}`;
  const url = `${process.env.BASE_URL}/api/qr/view?t=${token}`;

  return QRCode.toDataURL(url);
}
