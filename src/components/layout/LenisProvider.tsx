"use client";

import type { ReactNode } from "react";

// Lenis was removed — its overflow: clip on html/body was interfering with
// click delivery on the /book page. Native scroll is plenty smooth.
export function LenisProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
