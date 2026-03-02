"use client";

import * as React from "react";
import { OrbitItem } from "./Orbit";

function useMeasuredHeight<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [height, setHeight] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(([entry]) => {
      setHeight(entry.contentRect.height);
    });

    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return { ref, height };
}

function OrbitEdgeAlignedItem({
  children,
  gapPx = 8,
  ...orbitItemProps
}: {
  children: React.ReactNode;
  gapPx?: number;
} & React.ComponentProps<typeof OrbitItem>) {
  const { ref, height } = useMeasuredHeight<HTMLDivElement>();
  // half the card height + a small gap so it sits just outside the ring
  const radialOffsetPx = height > 0 ? height / 2 + gapPx : 0;
  return (
    <OrbitItem
      {...orbitItemProps}
      radialOffsetPx={radialOffsetPx}
      motionClassName="orbit-item-pingpong"
    >
      <div ref={ref}>{children}</div>
    </OrbitItem>
  );
}

export default OrbitEdgeAlignedItem;
