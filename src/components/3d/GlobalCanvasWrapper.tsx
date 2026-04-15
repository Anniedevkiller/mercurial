"use client";

import dynamic from "next/dynamic";

const GlobalCanvas = dynamic(() => import("@/components/3d/GlobalCanvas"), { ssr: false });

export default function GlobalCanvasWrapper() {
  return <GlobalCanvas />;
}
