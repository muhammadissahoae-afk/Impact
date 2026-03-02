// components/CircleIconContainer.tsx
import React from "react";

export default function CircleIconContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex size-10 items-center justify-center rounded-full bg-bg-2 shadow-i-icon border border-bg-2">
      <div className="size-5">{children}</div>
    </div>
  );
}
