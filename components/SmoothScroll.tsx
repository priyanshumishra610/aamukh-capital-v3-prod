'use client';

import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';

export default function SmoothScroll() {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.16,
        duration: 0.65,
        smoothWheel: true,
        wheelMultiplier: 1.75,
        touchMultiplier: 1.45,
        autoRaf: true,
        allowNestedScroll: true,
        stopInertiaOnNavigate: true,
      }}
    />
  );
}
