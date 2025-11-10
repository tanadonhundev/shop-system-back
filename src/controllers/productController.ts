
import { Request, Response } from "express";
import * as productService from "../services/productService";

export async function getProducts(req: Request, res: Response) {
  try {
    const result = await productService.getProducts();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}