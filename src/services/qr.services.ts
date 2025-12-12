import QRCode from "qrcode";
import { signQR } from "../security/sign";

export async function generateLoanQR(data: {
  loanId: string;
  customerName: string;
  paidDate: string;
}) {
  const sig = signQR(data);

  const payload = {
    ...data,
    sig
  };

  return QRCode.toDataURL(JSON.stringify(payload)); // PNG Base64
}
