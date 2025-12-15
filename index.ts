import express from "express";
import cors from "cors";
import router from "./src/routes/route";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = process.env.PORT || 5024;

app.listen(PORT, () => {
  console.log(`QR Microservice running on port ${PORT}`);
});
