import express from "express";
import productRoutes from "./routes/productRoute";

const app = express();
app.use(express.json());

app.use("/api/products", productRoutes);

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
