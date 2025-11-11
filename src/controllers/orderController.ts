import { Request, Response } from "express";
import * as oderService from "../services/orderService";

export async function createOrder(req: Request, res: Response) {
  try {
    const result = await oderService.createOrder(req)
    res.json({ data: result });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}