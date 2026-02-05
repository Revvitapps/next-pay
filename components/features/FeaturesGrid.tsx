'use client';

import { motion } from 'framer-motion';
import {
  ArrowRightLeft,
  BadgeCheck,
  CalendarClock,
  CreditCard,
  Link2,
  RefreshCcw
} from 'lucide-react';

const steps = [
  {
    title: 'Choose Your Industry',
    description:
      'Select your operating model so the platform can align workflows, integrations, and service delivery from day one.'
  },
  {
    title: 'Get a Suggested Stack',
    description:
      'Receive a tailored setup across operations, infrastructure, and integrations based on how your business runs.'
  },
  {
    title: 'Launch + Optimize',
    description:
      'Go live with onboarding support, performance tracking, and refinements that reduce friction and increase speed.'
  }
];

const capabilities = [
  {
    title: 'Business Operations',
    description: 'Workflows, approvals, and systems that keep teams aligned and execution fast.',
    icon: BadgeCheck
  },
  {
    title: 'Financial Workflows',
    description: 'Payments, subscriptions, invoicing, and gateway routing that support revenue operations.',
    icon: CreditCard
  },
  {
    title: 'Technology Integrations',
    description: 'Connect core apps, data, and tools to remove silos and reduce manual work.',
    icon: Link2
  },
  {
    title: 'Digital Infrastructure',
    description: 'Reliable environments for web, mobile, and service delivery across locations.',
    icon: CalendarClock
  },
  {
    title: 'Automation & Enablement',
    description: 'Automations, playbooks, and enablement layers to keep teams moving.',
    icon: RefreshCcw
  },
  {
    title: 'Partner Solutions',
    description: 'Partner-friendly delivery that supports referrals, co-selling, and rollout at scale.',
    icon: ArrowRightLeft
  }
];

export default function FeaturesGrid() {
  return (
    <section id="features" className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">How It Works</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Launch a business services stack that matches your operation
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Every deployment is mapped around service flow, ticket volume, and approval health so the platform feels
            intuitive to staff and reliable to guests.
          </p>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {steps.map((step, index) => (
            <motion.article
              key={step.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.9, delay: index * 0.08 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-card backdrop-blur transition hover:-translate-y-1 hover:border-cyan-200/40"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-[0.22em] text-zinc-400">Step {index + 1}</span>
                <BadgeCheck className="h-5 w-5 text-cyan-300" />
              </div>
              <h3 className="mt-4 font-heading text-2xl font-bold text-zinc-100">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{step.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Platform Capabilities</p>
            <h3 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white md:text-4xl">
              Infrastructure modules that scale with modern teams
            </h3>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Each module is designed to connect operations, financial workflows, and integrations without added
            complexity.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((capability, index) => (
            <motion.article
              key={capability.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-200/45 hover:bg-white/10"
            >
              <capability.icon className="h-5 w-5 text-cyan-300" />
              <p className="mt-3 text-base font-semibold text-zinc-100">{capability.title}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{capability.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
