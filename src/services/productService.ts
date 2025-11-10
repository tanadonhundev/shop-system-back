import { db } from "../db";
import { product, productImage } from "../db/schema";

export async function createProduct(req: any) {
  const result = await db
    .insert(product)
    .values([{ title: req.body.title, price: req.body.price }])
    .$returningId();

  for (const file of req.body.images) {
    await db.insert(productImage).values({
      productId: result[0].id,
      imageName: file,
    });
  }
}

export async function getProducts() {
  return await db.select().from(product);
}


