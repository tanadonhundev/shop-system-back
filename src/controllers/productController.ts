
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
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
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