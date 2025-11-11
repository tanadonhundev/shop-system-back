import { Router } from "express";
import * as productController from "../controllers/productController";

const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getProducts);
router.delete("/:id", productController.deleteProducts);
router.put("/:id", productController.updateProduct);

export default router;
