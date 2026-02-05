'use client';

import { GlowOrb } from '@/components/visuals/GlowOrb';
import { GridOverlay } from '@/components/visuals/GridOverlay';

export function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#05060A]">
      <div
        className="absolute inset-0 bg-no-repeat bg-center"
        style={{
          backgroundImage: "url('/images/main-page-hero.jpeg?v=3')",
          backgroundSize: 'cover'
        }}
      />
      <div className="absolute inset-0 bg-[#05060A]/32" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 8%, rgba(34, 211, 238, 0.14), transparent 36%), radial-gradient(circle at 12% 90%, rgba(167, 139, 250, 0.1), transparent 42%), linear-gradient(135deg, rgba(5, 6, 10, 0.32) 0%, rgba(9, 11, 18, 0.4) 44%, rgba(5, 6, 10, 0.32) 100%)'
        }}
      />
      <GlowOrb className="left-[-12rem] top-20 h-[22rem] w-[22rem]" colorClassName="bg-cyan-400/20" />
      <GlowOrb className="bottom-[-10rem] right-[-8rem] h-[20rem] w-[20rem]" colorClassName="bg-violet-400/20" />
      <GridOverlay />
    </div>
  );
}
