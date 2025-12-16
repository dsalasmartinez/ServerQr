import { Router } from "express";
import { generateQR, validateQR, viewQR } from "../controller/qr.controller";

const router = Router();

router.post("/qr/generate", generateQR);
router.post("/qr/verify", validateQR);
router.get("/qr/view", viewQR);

export default router;
