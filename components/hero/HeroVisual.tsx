'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const services = [
  {
    title: 'Operations + Infrastructure Stack',
    description:
      'Align tools, service flow, and system routing with how your teams operate across locations and channels.',
    bullets: ['Front desk + field coverage', 'Unified system access', 'Role-based controls'],
    image: '/images/counter-pos-system.webp'
  },
  {
    title: 'Service Delivery Workflow',
    description:
      'Design the customer journey to keep service moving, reduce friction, and build trust across every touchpoint.',
    bullets: ['Fast onboarding + training', 'Simplified reporting', 'Live service visibility'],
    image: '/images/mobile-pos-system.webp'
  },
  {
    title: 'Automation + Enablement',
    description:
      'Activate workflows, automations, and reporting that protect margin and improve long-term performance.',
    bullets: ['Automation playbooks', 'Integrated reporting', 'System + CRM sync'],
    image: '/images/full-pos-system.jpeg'
  }
];

export default function HeroVisual() {
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
          Hospitality-grade platform services built to convert and retain
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-zinc-300">
          Our team aligns operations, integrations, and infrastructure with how you operate so the stack feels
          seamless to staff and reliable to customers. Each service layer is designed to accelerate execution,
          improve trust, and simplify operations.
        </p>
      </motion.div>

      <div className="mt-10 space-y-6">
        {services.map((service, index) => {
          const isOdd = index % 2 === 1;
          return (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, x: isOdd ? 140 : -140, y: 26 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1.4, ease: 'easeOut' }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur md:p-8"
            >
              <div className="absolute inset-0">
                <div className="absolute inset-0 p-6 md:p-8">
                  <div className="relative h-full w-full">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="100vw"
                      className="object-contain object-center"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-slate-950/90" />
              </div>

              <div className="relative z-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                <div className="space-y-4">
                  <div className="h-px w-full bg-gradient-to-r from-cyan-300/50 via-white/10 to-transparent" />
                  <h3 className="font-heading text-2xl font-bold text-zinc-100 md:text-3xl">{service.title}</h3>
                  <p className="text-sm leading-relaxed text-zinc-200">{service.description}</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  {service.bullets.map((bullet) => (
                    <div
                      key={bullet}
                      className="rounded-2xl border border-white/15 bg-slate-950/85 px-4 py-3 text-sm text-zinc-100"
                    >
                      {bullet}
                    </div>
                  ))}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
