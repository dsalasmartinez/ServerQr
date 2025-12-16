import dotenv from "dotenv";
import express from "express";
dotenv.config();
import cors from "cors";
import router from "./routes/route";
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "./styles")));

app.use("/api", router);

const PORT = process.env.PORT || 5024;

app.listen(PORT, () => {
  console.log(`QR Microservice running on port ${PORT}`);
});
