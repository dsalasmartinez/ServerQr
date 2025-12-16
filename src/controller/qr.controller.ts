import { Request, Response } from "express";
import { generateLoanQR } from "../services/qr.services";
import { verifyQR } from "../security/sign";
import { renderQRView } from "../view/validate";

export async function generateQR(req: Request, res: Response) {
  const {
    loanId,
    customerName,
    customerSurName,
    firstQuotaDate,
    originalAmount,
    identification
  } = req.body;

  if (!loanId || !customerName || !firstQuotaDate)
    return res.status(400).json({ msg: "Missing fields" });

  const qr = await generateLoanQR(
    { 
      loanId, 
      customerName,
      customerSurName, 
      firstQuotaDate, 
      originalAmount,
      identification 
    });

  res.json(qr);
}

export async function validateQR(req: Request, res: Response) {
  try {
    const payload = req.body;
    const { sig, ...data } = payload;

    const valid = verifyQR(data, sig);

    res.json({ valid, data: valid ? data : null });
  } catch {
    res.status(400).json({ valid: false });
  }
}

export async function viewQR(req: Request, res: Response) {
  try {
    const token = req.query.t as string;
    if (!token) return res.status(400).send("Invalid QR");

    const decoded = JSON.parse(
      Buffer.from(token, "base64url").toString()
    );

    const { sig, ...data } = decoded;

    const valid = verifyQR(data, sig);

    res.send(renderQRView({ valid, data }));
  } catch {
    res.status(400).send("QR inválido");
  }
}
