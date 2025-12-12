import { Request, Response } from "express";
import { generateLoanQR } from "../services/qr.services";
import { verifyQR } from "../security/sign";

export async function generateQR(req: Request, res: Response) {
  const { loanId, customerName, paidDate } = req.body;

  if (!loanId || !customerName || !paidDate)
    return res.status(400).json({ msg: "Missing fields" });

  const qr = await generateLoanQR({ loanId, customerName, paidDate });

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
