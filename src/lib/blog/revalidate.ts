import "server-only";
import { revalidatePath } from "next/cache";

export function revalidateBlog() {
  revalidatePath("/");
  revalidatePath("/blog");
  revalidatePath("/(site)/blog/[slug]", "page");
}
