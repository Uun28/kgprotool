"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.0, // semakin rendah, semakin responsif
        smooth: true,
        smoothTouch: false, // false = native scroll di mobile
        lerp: 0.08,
        direction: "vertical"
      }}
    >
      {children}
    </ReactLenis>
  );
}
