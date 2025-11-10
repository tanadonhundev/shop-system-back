import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute";
import path from "path";

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
}));

app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
