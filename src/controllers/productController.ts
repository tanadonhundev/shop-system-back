
import { Request, Response } from "express";
import * as productService from "../services/productService";

export async function createProduct(req: Request, res: Response) {
  try {
    const result = await productService.createProduct(req);
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function getProducts(req: Request, res: Response) {
  try {
    const result = await productService.getProducts();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

export async function deleteProducts(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const result = await productService.deleteProducts(Number(id));

    if (!result.success) {
      if (result.message === "ไม่พบสินค้าที่จะลบ") {
        return res.status(404).json({ success: false, message: result.message });
      }
      if (result.message === "ไม่สามารถลบสินค้าได้ มีคนสั่งซื้อสินค้านี้แล้ว") {
        return res.status(400).json({ success: false, message: result.message });
      }
      return res.status(500).json({ success: false, message: result.message });
    }

    return res.status(200).json({ success: true, message: result.message });
  } catch (err) {
    console.error("Delete product controller error:", err);
    return res.status(500).json({ success: false, message: (err as Error).message });
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const result = await productService.updateProduct(id, req.body);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}