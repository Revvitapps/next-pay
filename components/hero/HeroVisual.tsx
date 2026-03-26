'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const services = [
  {
    title: 'Operations + Infrastructure Stack',
    description:
      'Align tools, service flow, and system routing with how your teams operate across locations and channels.',
    bullets: ['Front desk + field coverage', 'Unified system access', 'Role-based controls'],
    image: '/images/business-operations.png'
  },
  {
    title: 'Service Delivery Workflow',
    description:
      'Design the customer journey to keep service moving, reduce friction, and build trust across every touchpoint.',
    bullets: ['Fast onboarding + training', 'Simplified reporting', 'Live service visibility'],
    image: '/images/reporting-visibility.png'
  },
  {
    title: 'Automation + Enablement',
    description:
      'Activate workflows, automations, and reporting that protect margin and improve long-term performance.',
    bullets: ['Automation playbooks', 'Integrated reporting', 'System + CRM sync'],
    image: '/images/technology-integrations.png'
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

      <div className="mt-10 space-y-6">
        {services.map((service, index) => {
          const isOdd = index % 2 === 1;
          return (
            <motion.article
              key={service.title}
              initial={
                isMobile
                  ? false
                  : {
                      opacity: 0,
                      x: isOdd ? 24 : -24,
                      y: 12
                    }
              }
              whileInView={isMobile ? {} : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 np-surface"
            >
              <div className="relative h-[320px] w-full overflow-hidden bg-black/70 sm:h-[360px] md:h-[400px]">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center opacity-90 transition duration-700 group-hover:scale-[1.01]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/45 to-slate-950/70" />
              </div>

              <div className="relative z-10 mx-4 -mt-20 mb-4 space-y-4 rounded-2xl border border-white/10 np-card p-6 text-center backdrop-blur-md md:mx-6 md:-mt-24 md:p-8">
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
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
