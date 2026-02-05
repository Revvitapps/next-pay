'use client';

import { motion } from 'framer-motion';
import { GlowOrb } from '@/components/visuals/GlowOrb';
import { GridOverlay } from '@/components/visuals/GridOverlay';

export function GradientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#05060A]">
      <div
        className="absolute inset-0 bg-cover"
        style={{
          backgroundImage: "url('/images/updated-main-hero.jpeg')",
          backgroundPosition: 'center 12%'
        }}
      />
      <div className="absolute inset-0 bg-[#05060A]/36" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle at 82% 8%, rgba(34, 211, 238, 0.1), transparent 36%), radial-gradient(circle at 12% 90%, rgba(167, 139, 250, 0.07), transparent 42%), linear-gradient(135deg, rgba(5, 6, 10, 0.3) 0%, rgba(9, 11, 18, 0.38) 44%, rgba(5, 6, 10, 0.3) 100%)'
        }}
      />
      <GlowOrb className="left-[-12rem] top-20 h-[22rem] w-[22rem]" colorClassName="bg-cyan-400/20" />
      <GlowOrb className="bottom-[-10rem] right-[-8rem] h-[20rem] w-[20rem]" colorClassName="bg-violet-400/20" />
      <motion.div
        className="absolute inset-y-[-25%] left-[-40%] w-[70%] rotate-12"
        style={{
          background:
            'linear-gradient(110deg, rgba(255,255,255,0) 0%, rgba(186,230,253,0.08) 40%, rgba(255,255,255,0.22) 50%, rgba(186,230,253,0.08) 60%, rgba(255,255,255,0) 100%)',
          mixBlendMode: 'screen',
          filter: 'blur(12px)'
        }}
        animate={{ x: ['-120%', '120%'] }}
        transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-y-[-30%] left-[-30%] w-[60%] -rotate-6"
        style={{
          background:
            'linear-gradient(100deg, rgba(255,255,255,0) 0%, rgba(125,211,252,0.06) 45%, rgba(255,255,255,0.18) 52%, rgba(125,211,252,0.06) 60%, rgba(255,255,255,0) 100%)',
          mixBlendMode: 'screen',
          filter: 'blur(10px)'
        }}
        animate={{ x: ['-140%', '130%'] }}
        transition={{ duration: 36, ease: 'linear', repeat: Infinity }}
      />
      <GridOverlay />
    </div>
  );
}
