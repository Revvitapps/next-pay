'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { GlowOrb } from '@/components/visuals/GlowOrb';
import { GridOverlay } from '@/components/visuals/GridOverlay';
import { useEffect, useState } from 'react';

export function GradientBackground() {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  const disableSweepMotion = shouldReduceMotion || isMobile;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#0a0c10]">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/updated-main-hero.jpeg')",
          backgroundPosition: 'center 12%'
        }}
      />
      <div className="absolute inset-0 bg-[#0a0c10]/58" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 8%, rgba(70, 167, 166, 0.14), transparent 36%), radial-gradient(circle at 12% 90%, rgba(148, 163, 184, 0.12), transparent 44%), radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.34), transparent 58%), linear-gradient(145deg, rgba(2, 4, 8, 0.84) 0%, rgba(10, 13, 18, 0.78) 45%, rgba(22, 27, 35, 0.84) 100%)'
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.38)_100%)]" />
      <GlowOrb className="left-[-12rem] top-20 h-[22rem] w-[22rem]" colorClassName="bg-[#46a7a6]/20" />
      <GlowOrb className="bottom-[-10rem] right-[-8rem] h-[20rem] w-[20rem]" colorClassName="bg-[#163c4d]/30" />
      <motion.div
        className="absolute inset-y-[-20%] left-[-24%] w-[52%] rotate-10"
        style={{
          background:
            'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(186,230,253,0.05) 40%, rgba(255,255,255,0.14) 50%, rgba(186,230,253,0.05) 60%, rgba(255,255,255,0) 100%)',
          mixBlendMode: 'screen',
          filter: 'blur(8px)'
        }}
        animate={disableSweepMotion ? { x: 0 } : { x: ['-108%', '108%'] }}
        transition={disableSweepMotion ? { duration: 0 } : { duration: 18, ease: 'linear', repeat: Infinity }}
      />
      <GridOverlay />
    </div>
  );
}
