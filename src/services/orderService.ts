import { db } from "../db";
import { order, product } from "../db/schema";
import { eq, sql } from "drizzle-orm";


export async function createOrder(req: any) {
    try {
        const data = req.body.map((item: any) => ({
            userId: item.userId,
            productId: item.productId,
            price: item.price,
            qty: item.qty,
            status: item.status ?? "pending",
        }));
        await db.insert(order).values(data);

        for (const item of data) {
            await db.update(product)
                .set({ stock: sql`stock - ${item.qty}` })
                .where(eq(product.id, item.productId));
        }
        return {
            success: true,
            message: "สร้างออเดอร์เรียบร้อย",
        };
    } catch (error) {
        console.error("Create order error:", error);
        return {
            success: false,
            message: "สร้างออเดอร์ไม่สำเร็จ",
        };
    }
}
