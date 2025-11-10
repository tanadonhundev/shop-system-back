import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute";

const app = express();

// ✅ ตั้งค่า CORS
app.use(cors({
  origin: "http://localhost:3000", // อนุญาตเฉพาะ frontend ของคุณ
}));

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3333; // กำหนด default port เผื่อ env ไม่มีค่า
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
