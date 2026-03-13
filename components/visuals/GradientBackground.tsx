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
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#163c4d]">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/updated-main-hero.jpeg')",
          backgroundPosition: 'center 12%'
        }}
      />
      <div className="absolute inset-0 bg-[#163c4d]/36" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 8%, rgba(70, 167, 166, 0.1), transparent 36%), radial-gradient(circle at 12% 90%, rgba(167, 139, 250, 0.07), transparent 42%), linear-gradient(135deg, rgba(5, 6, 10, 0.3) 0%, rgba(9, 11, 18, 0.38) 44%, rgba(5, 6, 10, 0.3) 100%)'
        }}
      />
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
