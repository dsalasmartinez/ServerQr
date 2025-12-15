import express from "express";
import cors from "cors";
import router from "./src/routes/route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(5024, () => console.log("QR Microservice running on port 5024"));
