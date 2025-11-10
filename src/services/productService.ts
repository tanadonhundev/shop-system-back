import { db } from "../db";
import { product, productImage } from "../db/schema";
import { eq } from "drizzle-orm";

export async function createProduct(req: any) {
  try {
    const result = await db
      .insert(product)
      .values([
        {
          productName: req.body.productName,
          price: req.body.price,
          stock: req.body.stock
        }
      ])
      .$returningId();

    for (const file of req.body.images) {
      await db.insert(productImage).values({
        productId: result[0].id,
        imageName: file,
      });
    }
    return {
      success: true,
      message: "สร้างสินค้าเรียบร้อย",
    };
  } catch (error) {
    console.error("Create product error:", error);
    return {
      success: false,
      message: "สร้างสินค้าไม่สำเร็จ",
    };
  }
}

export async function getProducts() {
  return await db.select().from(product).leftJoin(productImage, eq(product.id, productImage.productId))
}


