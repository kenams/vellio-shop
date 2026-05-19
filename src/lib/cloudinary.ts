// Cloudinary upload service — used by discovery pipeline and admin sync
// Requires env vars: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
// Falls back gracefully if not configured.

import crypto from "crypto";

const CLOUD_NAME  = process.env.CLOUDINARY_CLOUD_NAME || "dora2euif";
const API_KEY     = process.env.CLOUDINARY_API_KEY;
const API_SECRET  = process.env.CLOUDINARY_API_SECRET;

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUD_NAME && API_KEY && API_SECRET);
}

function signParams(params: Record<string, string>): string {
  const str =
    Object.entries(params)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${v}`)
      .join("&") + API_SECRET;
  return crypto.createHash("sha256").update(str).digest("hex");
}

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  width: number;
  height: number;
  bytes: number;
  format: string;
}

// Upload a remote URL to Cloudinary under vellio/products/{productSlug}/
export async function uploadProductImage(
  sourceUrl: string,
  productSlug: string,
  position: number
): Promise<string | null> {
  if (!isCloudinaryConfigured()) return null;

  const folder    = "vellio/products";
  const publicId  = `${productSlug}-${position}`;
  const timestamp = String(Math.round(Date.now() / 1000));
  const params    = { folder, public_id: publicId, timestamp };
  const signature = signParams(params);

  try {
    const body = new URLSearchParams({
      file:       sourceUrl,
      folder,
      public_id:  publicId,
      timestamp,
      api_key:    API_KEY!,
      signature,
    });

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      { method: "POST", body, signal: AbortSignal.timeout(15000) }
    );
    if (!res.ok) {
      const err = await res.text();
      console.error("[cloudinary] Upload failed", res.status, err.slice(0, 200));
      return null;
    }
    const data: CloudinaryUploadResult = await res.json();
    // Return optimized delivery URL with auto quality/format
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/q_auto,f_auto,w_800,c_fill/${data.public_id}.${data.format}`;
  } catch (err: any) {
    console.error("[cloudinary] Upload error:", err.message);
    return null;
  }
}

// Upload all images for a product — returns Cloudinary URLs (or original on failure)
export async function uploadProductImages(
  imageUrls: string[],
  productSlug: string
): Promise<string[]> {
  if (!isCloudinaryConfigured()) return imageUrls;
  const results = await Promise.all(
    imageUrls.map((url, i) => uploadProductImage(url, productSlug, i))
  );
  return results.map((r, i) => r ?? imageUrls[i]);
}
