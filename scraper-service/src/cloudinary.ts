import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dora2euif",
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadImage(sourceUrl: string, publicId: string): Promise<string | null> {
  try {
    const result = await cloudinary.uploader.upload(sourceUrl, {
      public_id: publicId,
      overwrite: false,
      folder: "vellio/products",
      transformation: [{ quality: "auto", fetch_format: "auto", width: 800, crop: "fill" }],
    });
    return result.secure_url;
  } catch (err) {
    console.error("Cloudinary upload error:", err);
    return null;
  }
}
