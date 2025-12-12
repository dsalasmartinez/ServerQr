import { Router } from "express";
import { generateQR, validateQR } from "../controller/qr.controller";

const router = Router();

router.post("/qr/generate", generateQR);
router.post("/qr/verify", validateQR);

export default router;
