import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoute";
import orderRoutes from "./routes/orderRoute";

const app = express();

app.use(cors({
  origin: process.env.NEXT_PUBLIC_API,
}));

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
