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
    image: '/images/operations-infastructure-stack.jpg'
  },
  {
    title: 'Service Delivery Workflow',
    description:
      'Design the customer journey to keep service moving, reduce friction, and build trust across every touchpoint.',
    bullets: ['Fast onboarding + training', 'Simplified reporting', 'Live service visibility'],
    image: '/images/service-delivery-workflow.jpg'
  },
  {
    title: 'Automation + Enablement',
    description:
      'Activate workflows, automations, and reporting that protect margin and improve long-term performance.',
    bullets: ['Automation playbooks', 'Integrated reporting', 'System + CRM sync'],
    image: '/images/automation-enablement.jpg'
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
      <div className="absolute -inset-10 rounded-[2.5rem] bg-cyan-400/10 blur-3xl" aria-hidden />

      <motion.div
        initial={{ opacity: 0, x: -90, y: 16 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.3, ease: 'easeOut' }}
        className="mx-auto w-full max-w-none text-center"
      >
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Services</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Enterprise power. Right-sized for your business.
        </h2>
        <p className="mt-4 text-sm font-semibold leading-relaxed text-white/90">
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
              initial={{
                opacity: 0,
                x: isOdd ? (isMobile ? 60 : 140) : isMobile ? -60 : -140,
                y: isMobile ? 16 : 26
              }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: isMobile ? 0.9 : 1.4, ease: 'easeOut' }}
              className="group overflow-hidden rounded-3xl border border-white/15 bg-slate-950/90 shadow-card"
            >
              <div className="relative h-44 w-full overflow-hidden border-b border-white/10 bg-slate-950/85 sm:h-52 md:h-60">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="100vw"
                  className="object-cover object-center opacity-45 transition duration-700 group-hover:scale-[1.02]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/35 via-slate-950/55 to-slate-950/80" />
              </div>

              <div className="space-y-4 p-6 md:p-8">
                <div className="h-px w-full bg-gradient-to-r from-cyan-300/60 via-white/10 to-transparent" />
                <h3 className="font-heading text-2xl font-bold text-zinc-100 md:text-3xl">{service.title}</h3>
                <p className="text-sm leading-relaxed text-white/90">{service.description}</p>
                <ul className="space-y-2 text-sm text-white/90">
                  {service.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-cyan-300" />
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
