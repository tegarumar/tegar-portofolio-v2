"use client";

import { useCallback, useState } from "react";

export function useElementHeight<T extends HTMLElement>() {
  const [height, setHeight] = useState<number>();

  const ref = useCallback((node: T | null) => {
    if (!node) return;
    const observer = new ResizeObserver(([entry]) => {
      setHeight(entry.borderBoxSize[0].blockSize);
    });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, height] as const;
}
