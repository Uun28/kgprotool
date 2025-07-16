"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        lerp: 0.08,
        smoothWheel: true,
        smoothTouch: true,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
