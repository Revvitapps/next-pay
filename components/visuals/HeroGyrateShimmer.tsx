"use client";

import { motion } from "framer-motion";

export default function HeroGyrateShimmer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">

      <motion.div
        className="absolute left-1/2 top-1/2 z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 30% 30%, rgba(34,211,238,0.65), transparent 60%), radial-gradient(circle at 70% 70%, rgba(167,139,250,0.45), transparent 62%)",
          opacity: 1
        }}
        animate={{
          x: [0, 26, 0, -26, 0],
          y: [0, -18, -36, -18, 0],
          rotate: [0, 8, 0, -8, 0],
          scale: [1, 1.06, 1, 1.05, 1]
        }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 z-10 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
        style={{
          background:
            "radial-gradient(circle at 40% 20%, rgba(34,211,238,0.35), transparent 60%), radial-gradient(circle at 70% 80%, rgba(167,139,250,0.28), transparent 62%)",
          opacity: 0.9
        }}
        animate={{
          x: [0, -18, 0, 18, 0],
          y: [0, -10, -22, -10, 0],
          rotate: [0, -6, 0, 6, 0],
          scale: [1, 1.04, 1, 1.03, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute inset-0 z-20"
        style={{
          background:
            "linear-gradient(110deg, transparent 0%, rgba(255,255,255,0.10) 45%, rgba(255,255,255,0.22) 50%, rgba(255,255,255,0.10) 55%, transparent 100%)",
          mixBlendMode: "screen",
          opacity: 0.9
        }}
        animate={{ x: ["-120%", "120%"] }}
        transition={{ duration: 5.2, repeat: Infinity, ease: "linear" }}
      />

      <div className="absolute inset-0 z-30 bg-[radial-gradient(900px_circle_at_50%_40%,transparent_20%,rgba(5,6,10,0.64)_74%)]" />
    </div>
  );
}
