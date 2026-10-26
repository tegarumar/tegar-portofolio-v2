"use client";

import { XIcon } from "lucide-react";
import {
  AnimatePresence,
  motion,
  useDragControls,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { Dialog } from "radix-ui";
import type { ReactNode } from "react";
import { useElementHeight } from "@/hooks/use-element-height";
import { useMediaQuery } from "@/hooks/use-media-query";
import { spring } from "@/lib/motion";

type TrayProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  icon?: ReactNode;
  description?: string;
  children: ReactNode;
  onExitComplete?: () => void;
};

export function Tray({
  open,
  onOpenChange,
  title,
  icon,
  description,
  children,
  onExitComplete,
}: TrayProps) {
  const isDesktop = useMediaQuery("(min-width: 640px)", true);
  const reduce = useReducedMotion();
  const dragControls = useDragControls();
  const [contentRef, contentHeight] = useElementHeight<HTMLDivElement>();

  const panel = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : isDesktop
      ? {
          hidden: { opacity: 0, scale: 0.96, y: 12 },
          visible: { opacity: 1, scale: 1, y: 0 },
        }
      : { hidden: { y: "100%" }, visible: { y: 0 } };

  function handleDragEnd(_: PointerEvent, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 600) onOpenChange(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence onExitComplete={onExitComplete}>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                className="fixed inset-0 z-50 bg-overlay backdrop-blur-[2px]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            </Dialog.Overlay>
            <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
              <Dialog.Content
                asChild
                forceMount
                {...(!description && { "aria-describedby": undefined })}
              >
                <motion.div
                  className="pointer-events-auto relative w-full overflow-hidden rounded-t-tray bg-surface shadow-lift outline-none sm:max-w-lg sm:rounded-tray"
                  variants={panel}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={spring}
                  drag={isDesktop || reduce ? false : "y"}
                  dragControls={dragControls}
                  dragListener={false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={{ top: 0.02, bottom: 0.9 }}
                  onDragEnd={handleDragEnd}
                >
                  <motion.div
                    className="overflow-hidden"
                    initial={false}
                    animate={{ height: contentHeight ?? "auto" }}
                    transition={spring}
                  >
                    <div ref={contentRef}>
                      <header
                        className="touch-none select-none"
                        onPointerDown={(event) => {
                          if (!isDesktop) dragControls.start(event);
                        }}
                      >
                        {!isDesktop && (
                          <span
                            aria-hidden
                            className="mx-auto mt-2.5 block h-1 w-9 rounded-full bg-border"
                          />
                        )}
                        <div className="flex items-center gap-3 px-6 pt-5 sm:pt-6">
                          {icon}
                          <Dialog.Title className="min-w-0 truncate text-[17px] font-semibold text-foreground">
                            {title}
                          </Dialog.Title>
                          <Dialog.Close
                            className="ml-auto grid size-8 shrink-0 place-items-center rounded-full bg-hover text-muted transition-colors duration-300 ease-out-expo hover:text-foreground"
                            aria-label="Close"
                          >
                            <XIcon className="size-4" strokeWidth={2.25} />
                          </Dialog.Close>
                        </div>
                        {description && (
                          <Dialog.Description className="sr-only">
                            {description}
                          </Dialog.Description>
                        )}
                      </header>
                      <div className="max-h-[calc(90dvh-4.5rem)] overflow-y-auto overscroll-contain px-6 pb-6 pt-4 sm:max-h-[calc(85dvh-4.5rem)]">
                        {children}
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
