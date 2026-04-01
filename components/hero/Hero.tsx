'use client';

import { motion } from 'framer-motion';
import ConversionCtas from '@/components/cta/ConversionCtas';
import HeroVisual from '@/components/hero/HeroVisual';
import LogoStrip from '@/components/LogoStrip';
import HeroGyrateShimmer from '@/components/visuals/HeroGyrateShimmer';
import MotionDiv from '@/components/visuals/MotionDiv';
import type { TrustLogo } from '@/lib/content/logos';

const highlights = ['Payments in-store, online, and on the go', 'POS, payroll, and funding in one stack', 'Cleaner reporting with less operational drag'];

const homepageTrustedLogos: TrustLogo[] = [
  { name: 'American Express', alt: 'American Express logo', assetPath: '/logos/american-express.svg', fallbackAssetPath: '/logos/american-express.png' },
  { name: 'Visa', alt: 'Visa logo', assetPath: '/logos/visa.svg', fallbackAssetPath: '/logos/visa.png' },
  { name: 'Discover', alt: 'Discover wordmark' },
  { name: 'Mastercard', alt: 'Mastercard logo', assetPath: '/logos/mastercard.svg', fallbackAssetPath: '/logos/mastercard.png' },
  { name: 'TSYS', alt: 'TSYS wordmark' },
  { name: 'Fiserv', alt: 'Fiserv wordmark' },
  { name: 'Apple Pay', alt: 'Apple Pay logo', assetPath: '/logos/apple-pay.svg', fallbackAssetPath: '/logos/apple-pay.png' },
  { name: 'Google Pay', alt: 'Google Pay wordmark' }
];

export default function Hero() {
  return (
    <section id="home" className="w-full overflow-x-clip">
      <div className="relative isolate flex w-full min-h-[88svh] items-center overflow-hidden md:min-h-screen md:min-h-[100svh]">
        <HeroGyrateShimmer />

        <div className="relative z-40 w-full px-6 pb-12 pt-[17vh] sm:pb-16 sm:pt-[19vh] md:pb-24 md:pt-[24vh] lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.75, ease: 'easeOut' }}
            className="mx-auto w-full max-w-6xl text-center"
          >
            <MotionDiv>
              <div className="p-6 text-center md:p-10">
                <span className="inline-flex text-sm font-semibold uppercase tracking-[0.28em] text-[#89e6e2]">
                  NextPay Platform
                </span>
                <h1 className="mx-auto mt-5 max-w-5xl font-heading text-4xl font-extrabold leading-tight tracking-[-0.02em] text-white drop-shadow-[0_18px_36px_rgba(0,0,0,0.34)] sm:text-5xl md:text-6xl">
                  Accept Payments Anywhere. Run Your Entire Business with NextPay.
                </h1>
                <p className="mx-auto mt-6 max-w-4xl text-base leading-relaxed text-white/92 md:text-lg">
                  Payment processing, POS, financing, payroll, and growth tools in one connected platform.
                </p>
                <ul className="mx-auto mt-8 flex max-w-5xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white">
                  {highlights.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28, y: 10 }}
                      whileInView={{ opacity: 1, x: 0, y: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.58, delay: index * 0.06 }}
                      className="inline-flex items-center gap-3 text-sm font-semibold text-slate-100/94 md:text-base"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[#7dd9d8]" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.62, delay: 0.12 }}
                  className="mt-8 flex justify-center"
                >
                  <ConversionCtas
                    primary="customQuote"
                    secondary="uploadStatement"
                    labelOverrides={{ customQuote: 'Take The Quiz' }}
                  />
                </motion.div>
              </div>
            </MotionDiv>
            <div className="relative left-1/2 mt-14 w-screen -translate-x-1/2 md:mt-32">
              <div className="px-6 py-2 text-center md:px-10">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/62">
                  Trusted Network
                </p>
                <div className="mt-4">
                  <LogoStrip
                    logos={homepageTrustedLogos}
                    mode="mixedMonochrome"
                    className="homepage-partner-marquee [&_.logo-chip]:text-white/94"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <section className="px-6 pb-16 pt-4 md:pb-20 md:pt-14 lg:px-12">
        <motion.div
          initial={{ opacity: 0, x: 30, y: 14 }}
          whileInView={{ opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
          className="relative w-full"
        >
          <div className="mx-auto w-full max-w-none">
            <HeroVisual />
          </div>
        </motion.div>
      </section>
    </section>
  );
}
