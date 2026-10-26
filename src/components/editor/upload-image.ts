import { createClient } from "@/lib/supabase/client";

export const IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/webp",
  "image/gif",
  "image/avif",
];

const MAX_BYTES = 5 * 1024 * 1024;

export async function uploadImage(file: File, postId: string) {
  if (!IMAGE_TYPES.includes(file.type)) {
    throw new Error("Use a PNG, JPEG, WebP, GIF or AVIF image.");
  }
  if (file.size > MAX_BYTES) throw new Error("Images can be up to 5MB.");

  const extension = file.type.split("/")[1].replace("jpeg", "jpg");
  const path = `${postId}/${crypto.randomUUID()}.${extension}`;
  const bucket = createClient().storage.from("blog-images");

  const { error } = await bucket.upload(path, file, {
    contentType: file.type,
    cacheControl: "31536000",
    upsert: false,
  });
  if (error) throw new Error(error.message);

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  bitmap.close();

  return { src: bucket.getPublicUrl(path).data.publicUrl, width, height };
}
