import { LoaderCircleIcon, Trash2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";

export function DeleteIcon() {
  return (
    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-hover text-danger">
      <Trash2Icon className="size-4" />
    </span>
  );
}

export function DeleteConfirm({
  title,
  pending,
  error,
  onCancel,
  onConfirm,
}: {
  title: string;
  pending: boolean;
  error: string | null;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="space-y-5">
      <p>
        <span className="font-medium text-foreground">
          {title || "Untitled"}
        </span>{" "}
        and its images will be gone for good. This can&apos;t be undone.
      </p>
      {error && (
        <p role="alert" className="text-[14px] text-danger">
          {error}
        </p>
      )}
      <div className="flex justify-end gap-2">
        <Button
          type="button"
          variant="secondary"
          disabled={pending}
          onClick={onCancel}
        >
          Keep it
        </Button>
        <Button
          type="button"
          pending={pending}
          onClick={onConfirm}
          className="bg-danger text-danger-foreground hover:bg-danger/90"
        >
          {pending && <LoaderCircleIcon className="animate-spin" />}
          {pending ? "Deleting…" : "Delete forever"}
        </Button>
      </div>
    </div>
  );
}
