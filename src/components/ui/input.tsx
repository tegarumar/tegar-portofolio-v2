import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const fieldClass =
  "w-full rounded-2xl border bg-background px-4 text-[16px] text-foreground outline-none transition-[border-color,box-shadow] duration-300 ease-out-expo placeholder:text-muted focus:border-accent-soft focus:ring-4 focus:ring-accent-soft/15";

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(fieldClass, "h-11", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(fieldClass, "min-h-24 resize-none py-3", className)}
      {...props}
    />
  );
}

export function Label({ className, ...props }: ComponentProps<"label">) {
  return (
    <label
      className={cn("block text-[14px] font-medium text-foreground", className)}
      {...props}
    />
  );
}
