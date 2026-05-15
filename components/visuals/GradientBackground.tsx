'use client';

import { GlowOrb } from '@/components/visuals/GlowOrb';
import { GridOverlay } from '@/components/visuals/GridOverlay';

export function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#0a0c10]">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/updated-main-hero.jpeg')",
          backgroundPosition: 'center 12%'
        }}
      />
      <div className="absolute inset-0 bg-[#0a0c10]/42" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 8%, rgba(104, 132, 140, 0.08), transparent 36%), radial-gradient(circle at 12% 90%, rgba(148, 163, 184, 0.08), transparent 44%), radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.18), transparent 58%), linear-gradient(145deg, rgba(2, 4, 8, 0.68) 0%, rgba(10, 13, 18, 0.56) 45%, rgba(22, 27, 35, 0.7) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_46%,rgba(0,0,0,0.22)_100%)]" />
      <GlowOrb className="left-[-12rem] top-20 h-[22rem] w-[22rem]" colorClassName="bg-white/[0.08]" />
      <GlowOrb className="bottom-[-10rem] right-[-8rem] h-[20rem] w-[20rem]" colorClassName="bg-slate-500/20" />
      <div
        className="absolute inset-y-[-20%] left-[-24%] w-[52%] rotate-10"
        style={{
          background:
            'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(186,230,253,0.05) 40%, rgba(255,255,255,0.14) 50%, rgba(186,230,253,0.05) 60%, rgba(255,255,255,0) 100%)',
          mixBlendMode: 'screen',
          filter: 'blur(8px)',
          transform: 'translateX(-12%) rotate(10deg)'
        }}
      />
      <GridOverlay />
    </div>
  );
}
