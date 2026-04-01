'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const services = [
  {
    title: 'Payment Processing & POS Systems',
    description:
      'Launch with payment acceptance, POS hardware, and checkout systems built around the way your business operates.',
    bullets: ['In-person + online payments', 'Countertop, mobile, and full POS', 'Faster checkout + cleaner reporting'],
    image: '/images/payment-processing.png',
    href: '/services/payment-processing-merchant-services'
  },
  {
    title: 'Business Lending',
    description:
      'Add working capital, equipment financing, and expansion funding when the business is ready to grow.',
    bullets: ['Working capital options', 'Equipment financing', 'Expansion funding'],
    image: '/images/financial-workflows.png',
    href: '/services/business-financing-funding'
  },
  {
    title: 'Network Building',
    description:
      'Strengthen visibility, outreach, and reputation once your payments and operations foundation is in place.',
    bullets: ['Reputation support', 'Outreach systems', 'Relationship-driven growth'],
    image: '/images/connected-stack-blog-image.png',
    href: '/services/marketing-outreach-lead-generation'
  }
];

export default function HeroVisual() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 768px)');
    const update = () => setIsMobile(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return (
    <div className="relative w-full">
      <div className="absolute -inset-10 rounded-[2.5rem] bg-white/5 blur-3xl" aria-hidden />

      <motion.div
        initial={isMobile ? false : { opacity: 0, x: -20, y: 10 }}
        whileInView={isMobile ? {} : { opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="mx-auto w-full max-w-none text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] np-accent">Services</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Enterprise power. Right-sized for your business.
        </h2>
        <p className="mt-4 text-sm font-semibold leading-relaxed text-slate-100/95">
          Whether you’re just getting started or scaling fast, we provide the same reliable systems used by larger
          enterprises — including payments, POS, automation, and integrations — designed to meet you where you are
          today and grow with you tomorrow.
        </p>
      </motion.div>

      <div className="mt-8 space-y-5 md:mt-10 md:space-y-6">
        {services.map((service, index) => {
          const isOdd = index % 2 === 1;
          return (
            <motion.div
              key={service.title}
              initial={{
                opacity: 0,
                x: isMobile ? 0 : isOdd ? 24 : -24,
                y: isMobile ? 28 : 12
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: isMobile ? 0.18 : 0.25 }}
              transition={{ duration: isMobile ? 0.42 : 0.5, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 np-surface"
            >
              <Link href={service.href} className="block">
                <div className="relative h-[240px] w-full overflow-hidden bg-black/70 sm:h-[300px] md:h-[400px]">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    sizes="100vw"
                    className="object-cover object-center opacity-90 transition duration-700 group-hover:scale-[1.01]"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/45 to-slate-950/70" />
                </div>

                <div className="relative z-10 mx-3 -mt-14 mb-3 space-y-4 rounded-2xl border border-white/10 np-card p-5 text-center backdrop-blur-md md:mx-6 md:-mt-24 md:mb-4 md:p-8">
                  <div className="h-px w-full bg-gradient-to-r from-white/20 via-white/10 to-transparent" />
                  <h3 className="font-heading text-2xl font-bold text-zinc-100 md:text-3xl">{service.title}</h3>
                  <p className="mx-auto max-w-3xl text-sm leading-relaxed text-slate-100/95">{service.description}</p>
                  <ul className="mx-auto flex w-full max-w-2xl flex-col items-center space-y-2 text-center text-sm text-slate-100/95">
                    {service.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-center justify-center gap-3">
                        <span className="h-1.5 w-1.5 rounded-full np-accent" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="np-accent text-sm font-semibold uppercase tracking-[0.16em]">Take The Quiz</p>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
