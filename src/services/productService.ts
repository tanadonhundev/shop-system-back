import { db } from "../db";
import { order, product, productImage } from "../db/schema";
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
export async function deleteProducts(id: number) {
  try {
    // ตรวจสอบว่ามีสินค้าไหม
    const productExist = await db.select().from(product).where(eq(product.id, id));
    if (productExist.length === 0) {
      return {
        success: false,
        message: "ไม่พบสินค้าที่จะลบ",
      };
    }
    // ตรวจสอบว่ามี order ใช้สินค้านี้หรือไม่
    const orderExist = await db.select().from(order).where(eq(order.productId, id));
    if (orderExist.length > 0) {
      return {
        success: false,
        message: "ไม่สามารถลบสินค้าได้ มีคนสั่งซื้อสินค้านี้แล้ว",
      };
    }
    // ลบสินค้า
    await db.delete(product).where(eq(product.id, id));

    return {
      success: true,
      message: "ลบสินค้าสำเร็จ",
    };
  } catch (error) {
    console.error("Delete product error:", error);
    return {
      success: false,
      message: "ลบสินค้าไม่สำเร็จ",
    };
  }
}

export async function updateProduct(id: number, data: any) {
  await db
    .update(product)
    .set({
      productName: data.productName,
      price: data.price,
      stock: data.stock,
    })
    .where(eq(product.id, id));

  return { message: "อัพเดตสินค้าสำเร็จ" };
}

