import { db } from "../db";
import { product, productImage } from "../db/schema";
import { handleFileUpload } from "./uploadService";

export async function createProduct(req: any) {
  const { files, formData } = await handleFileUpload(req);
  const result = await db
    .insert(product)
    .values([{ title: formData.title, price: formData.price }])
    .$returningId();

  for (const file of files) {
    await db.insert(productImage).values({
      productId: result[0].id,
      imageName: file,
    });
  }
}

export async function getProducts() {
  return await db.select().from(product);
}


