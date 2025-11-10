import { Request } from "express";
import { createWriteStream, unlinkSync } from "fs";
import { mkdir } from "fs/promises";
import path from "path";
import Busboy from "busboy";


export async function handleFileUpload(req: Request): Promise<{ files: string[], formData: Record<string, any> }> {
    const uploadDir = path.join(process.cwd(), "public/uploads");
    await mkdir(uploadDir, { recursive: true });
    return new Promise((resolve, reject) => {
        const bb = Busboy({ headers: req.headers });

        const files: string[] = [];
        const formData: Record<string, any> = {};

        // ✅ รับไฟล์
        bb.on("file", (_fieldname, file, info) => {
            const extension = path.extname(info.filename || "");
            const filename = extension;
            const saveTo = path.join(uploadDir, filename);

            file.pipe(createWriteStream(saveTo));
            files.push(filename);
        });

        // ✅ รับข้อมูลธรรมดา
        bb.on("field", (fieldname, val) => {
            formData[fieldname] = val;
        });

        // ✅ เมื่อประมวลผลเสร็จ
        bb.on("finish", () => {
            resolve({ files, formData });
        });

        bb.on("error", (err) => reject(err));

        req.pipe(bb);
    });
}
