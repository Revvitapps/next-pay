"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type HeroBackgroundRotatorProps = {
  images: string[];
};

export default function HeroBackgroundRotator({ images }: HeroBackgroundRotatorProps) {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const sourceImages = images.slice(0, 3);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const image1Opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 0]);
  const image2OpacityTwo = useTransform(scrollYProgress, [0, 0.24, 0.72, 1], [0, 0.25, 1, 1]);
  const image2OpacityThree = useTransform(scrollYProgress, [0, 0.24, 0.55, 0.82, 1], [0, 0.2, 1, 0.15, 0]);
  const image3Opacity = useTransform(scrollYProgress, [0, 0.55, 1], [0, 0.3, 1]);

  const secondOpacity = sourceImages.length > 2 ? image2OpacityThree : image2OpacityTwo;

  return (
    <div ref={heroRef} aria-hidden className="absolute inset-0 z-0">
      {sourceImages.map((src, index) => {
        const opacity =
          index === 0
            ? image1Opacity
            : index === 1
              ? secondOpacity
              : image3Opacity;

        return (
          <motion.div key={src} className="absolute inset-0" style={{ opacity }}>
            <Image
              src={src}
              alt=""
              fill
              priority={index < 2}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        );
      })}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05060A]/48 via-[#05060A]/54 to-[#05060A]/72" />
    </div>
  );
}

