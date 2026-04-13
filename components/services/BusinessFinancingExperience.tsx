'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import LogoBand from '@/components/trust/LogoBand';
import { operationsTrustLogos } from '@/lib/content/logos';
import MotionDiv from '@/components/visuals/MotionDiv';

const fundingPrograms = [
  {
    title: 'Equipment Financing',
    description:
      'Spread equipment costs over time while preserving working capital for operations, installation, and rollout.',
    highlights: ['$10,000 to $750,000', '6 month to 10 year terms', 'Fast review path'],
    image: '/images/67e39bb97f14af7c0a8dbe3b_two-colleagues-having-conversation-at-work-in-indu-2024-07-18-16-03-27-utc 1.avif',
    imageAlt: 'Equipment financing visual',
    imageClass: 'object-cover object-center'
  },
  {
    title: 'Revenue Based Financing',
    description:
      'Access capital tied to future revenue for payroll, inventory, taxes, hiring, or short-term growth needs.',
    highlights: ['$2,000 to $1,000,000', '3 to 18 month terms', 'Repayment tied to revenue flow'],
    image: '/images/67e39bb97f14af7c0a8dbe39_young-millennial-woman-shopping-at-a-local-small-b-2024-11-01-02-33-26-utc (1).avif',
    imageAlt: 'Revenue based financing visual',
    imageClass: 'object-cover object-center'
  },
  {
    title: 'Term Loans',
    description:
      'Use a traditional lump-sum structure when fixed repayment and a defined payoff schedule are the right fit.',
    highlights: ['$25,000 to $500,000', '12 to 60 month terms', 'Often used for larger investments or expansion'],
    image: '/images/67e39bb97f14af7c0a8dbd81_feature-09.avif',
    imageAlt: 'Term loan visual',
    imageClass: 'object-cover object-[center_30%]'
  },
  {
    title: 'Business Lines of Credit',
    description:
      'Keep flexible access to capital on hand and draw only what the business needs when timing matters.',
    highlights: ['Up to $750,000', 'Interest only on what is drawn', 'Typical approvals in 1 to 3 business days'],
    image: '/images/67e39bb97f14af7c0a8dbdcc_mission-02.avif',
    imageAlt: 'Business line of credit visual',
    imageClass: 'object-cover object-[center_18%]'
  },
  {
    title: 'Real Estate Short-Term Loans',
    description:
      'Built for acquisition, rehab, construction, refinance, or repositioning with faster execution windows.',
    highlights: ['Fix and flip, bridge, and ground-up construction', 'Up to 90% LTC / 80% LTV on select programs', 'Funding windows from 7 to 35 days'],
    image: '/images/691fc26292d2823d17db6241_real-estate-project-finance.webp',
    imageAlt: 'Property acquisition and rehab financing',
    imageClass: 'object-cover object-center'
  },
  {
    title: 'Real Estate Long-Term Loans',
    description:
      'Longer-duration financing for stabilized rentals and commercial real estate based on property performance.',
    highlights: ['DSCR rental and commercial real estate', 'Up to 80% LTV', '25 to 30 year term structures'],
    image: '/images/business-brokerage-hero.png',
    imageAlt: 'Long-term commercial real estate financing',
    imageClass: 'object-cover object-center'
  }
];

const lendingAdvantages = [
  'Soft credit pull positioning on the partner landing page',
  'Application path for both business and real estate funding',
  'Fast prequalification-oriented flow',
  'Same-day or near-term funding messaging for select programs',
  'Document collection built into the application',
  'Faster alternative to a traditional bank process'
];

const applicationSteps = [
  {
    step: '1',
    title: 'Apply Online',
    description: 'Start with the live funding application and choose business funding or real estate funding.'
  },
  {
    step: '2',
    title: 'Review Offers',
    description: 'Move into a guided review of the structures that best match the request and borrower profile.'
  },
  {
    step: '3',
    title: 'Receive Funds',
    description: 'Advance to funding once the file, documents, and offer selection are complete.'
  }
];

const businessFundingFields = [
  'Funding type, business name, DBA, email, phone, structure, tax ID, industry, and NAICS',
  'Average monthly deposits, founded date, owned-since date, website, and homeownership status',
  'Primary business location and owner details',
  'Amount requested, credit score estimate, primary use of funds, and current loans or advances',
  'Most recent three months of bank statements, deal notes, and signature'
];

const realEstateFields = [
  'Borrower role, borrowing entity, citizenship, state, and experience',
  'Loan type, transaction type, property address, property type, and timeline',
  'Purchase price, ARV, rehab budget, total project cost, and requested loan amount',
  'Exit strategy, deal summary, and rental information where applicable',
  'Supporting documents including ID, statements, contracts, budgets, leases, insurance, and property photos'
];

export default function BusinessFinancingExperience() {
  return (
    <div className="relative bg-[linear-gradient(180deg,rgba(5,7,10,0.98),rgba(8,11,15,1)_14%,rgba(6,8,11,1)_100%)] px-0 py-10">
      <section id="funding-programs" className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px] overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(6,9,13,0.98),rgba(10,13,18,0.96))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.42)] md:p-10">
          <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr] xl:items-center">
            <MotionDiv className="text-left" variant="left">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7dd9d8]">Funding Programs</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-5xl">
                Capital options presented with a stronger product-story rhythm
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-100/84 md:text-base">
                The Reveal page works because it stacks clear funding types, visual blocks, and a simple application
                story. This section follows that structure more closely while staying inside the existing NextPay visual
                system.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {['Pre-approval messaging under 24 hours', 'Business and real estate paths', 'Fast document-led review'].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#46a7a6]/26 bg-[#46a7a6]/10 px-4 py-2 text-sm text-slate-100/90"
                  >
                    {item}
                  </span>
                ))}
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  { label: 'Business Funding', value: 'Equipment, revenue, term, LOC' },
                  { label: 'Real Estate', value: 'Short-term and long-term programs' },
                  { label: 'Application', value: 'One active underwriting flow' }
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,15,0.96),rgba(12,16,20,0.88))] p-4"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">{item.label}</p>
                    <p className="mt-2 text-sm text-slate-100/84">{item.value}</p>
                  </div>
                ))}
              </div>
            </MotionDiv>

            <MotionDiv className="grid gap-4 md:grid-cols-2" variant="right" delay={0.08}>
              <div className="relative min-h-[220px] overflow-hidden rounded-[28px] border border-white/10 bg-black/40 md:row-span-2">
                <Image
                  src="/images/67e39bb97f14af7c0a8dbd7e_feature-06.avif"
                  alt="Financing visual"
                  fill
                  sizes="(max-width: 1280px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5 text-left">
                  <div className="rounded-2xl border border-white/10 bg-black/45 p-4 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#7dd9d8]">Fast And Flexible</p>
                    <p className="mt-2 text-sm text-slate-100/84">
                      Structured around speed, funding-type clarity, and a cleaner path into the active application.
                    </p>
                  </div>
                </div>
              </div>

              {lendingAdvantages.slice(0, 4).map((item, index) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: index * 0.06 }}
                  className="rounded-[24px] border border-white/10 bg-[linear-gradient(180deg,rgba(7,10,14,0.96),rgba(11,15,20,0.9))] p-5 text-left"
                >
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#46a7a6]/28 bg-[#46a7a6]/10 text-sm font-semibold text-[#7dd9d8]">
                    0{index + 1}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-slate-100/84">{item}</p>
                </motion.div>
              ))}
            </MotionDiv>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto grid w-full max-w-[1380px] gap-5 md:grid-cols-2 xl:grid-cols-3">
          {fundingPrograms.map((program, index) => (
            <motion.article
              key={program.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="group overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,15,0.96),rgba(12,16,20,0.9))] text-left"
            >
              <div className="relative h-56 overflow-hidden border-b border-white/10">
                <Image
                  src={program.image}
                  alt={program.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                  className={`${program.imageClass} transition duration-500 group-hover:scale-[1.04]`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-xl font-bold text-white">{program.title}</p>
                </div>
              </div>

              <div className="p-6">
                <p className="text-sm leading-relaxed text-slate-100/84">{program.description}</p>
                <ul className="mt-5 space-y-2 text-sm text-slate-100/88">
                  {program.highlights.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[#7dd9d8]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <div className="px-6 pb-12 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_26px_70px_rgba(0,0,0,0.34)]">
          <LogoBand
            eyebrow="Trusted Brands"
            title="Platforms and partners supporting the broader lending and operations stack"
            logos={operationsTrustLogos}
            variant="darkGlass"
            compact
          />
        </div>
      </div>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px] rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(6,9,13,0.98),rgba(10,13,18,0.96))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.42)] md:p-10">
          <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr] xl:items-center">
            <MotionDiv className="relative min-h-[320px] overflow-hidden rounded-[30px] border border-white/10 bg-black/40" variant="left">
              <Image
                src="/images/67e39bb97f14af7c0a8dbd81_feature-09.avif"
                alt="Funding process overview"
                fill
                sizes="(max-width: 1280px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
            </MotionDiv>

            <MotionDiv className="text-left" variant="right">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7dd9d8]">How It Works</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                A more visual application flow, closer to the source page
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-100/84 md:text-base">
                The Reveal page uses simple sequential storytelling. This keeps that same progression, but translated
                into the current site’s darker glass surface system instead of their palette.
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {applicationSteps.map((item, index) => (
                  <motion.article
                    key={item.step}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.75, delay: index * 0.07 }}
                    className="rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(7,10,14,0.96),rgba(11,15,20,0.88))] p-5"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#46a7a6]/30 bg-[#46a7a6]/10 text-base font-bold text-[#7dd9d8]">
                      {item.step}
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-white">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-100/82">{item.description}</p>
                  </motion.article>
                ))}
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px] rounded-3xl border border-white/10 bg-[linear-gradient(180deg,rgba(6,9,13,0.98),rgba(10,13,18,0.96))] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.42)] md:p-10">
          <div className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="text-left max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#7dd9d8]">Application Scope</p>
              <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
                Clear intake expectations before the form opens
              </h2>
            </div>
            <p className="text-left text-sm leading-relaxed text-slate-100/82 lg:pb-1">
              The goal here is similar to the source page: make the process feel understandable before someone commits
              to filling out the application.
            </p>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            {[
              {
                title: 'Business Funding Path',
                image: '/images/67e39bb97f14af7c0a8dbdcc_mission-02.avif',
                items: businessFundingFields
              },
              {
                title: 'Real Estate Funding Path',
                image: '/images/691fc26292d2823d17db6241_real-estate-project-finance.webp',
                items: realEstateFields
              }
            ].map((section, index) => (
              <motion.article
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, delay: index * 0.08 }}
                className="overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(8,10,13,0.96),rgba(12,15,19,0.9))] text-left"
              >
                <div className="relative h-52 border-b border-white/10">
                  <Image
                    src={section.image}
                    alt={section.title}
                    fill
                    sizes="(max-width: 1280px) 100vw, 50vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-2xl font-bold text-white">{section.title}</p>
                  </div>
                </div>

                <div className="p-6">
                  <ul className="space-y-3 text-sm text-slate-100/86">
                    {section.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-[#7dd9d8]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="funding-application" className="px-6 pb-20 lg:px-12">
        <div className="mx-auto w-full max-w-[1380px] rounded-3xl border border-[#46a7a6]/18 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.08),transparent_38%),linear-gradient(180deg,rgba(6,8,11,0.98),rgba(10,12,16,0.94))] p-6 md:p-8">
          <div className="flex flex-col gap-3 text-left md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#7dd9d8]">Active Application</p>
              <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white md:text-4xl">Funding Application</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-100/84 md:text-base">
                The live Jotform remains the source of truth for underwriting fields. The surrounding section now feels
                closer to the Reveal landing page, but the application itself stays synced to the active intake.
              </p>
            </div>
            <Link
              href="https://form.jotform.com/250841370856258?utm_campaign=11023295752"
              className="inline-flex rounded-full border border-[#46a7a6]/35 bg-[#46a7a6]/12 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#7dd9d8]/50 hover:bg-[#46a7a6]/18"
            >
              Open Form in New Tab
            </Link>
          </div>

          <div className="mt-6 overflow-hidden rounded-[28px] border border-white/10 bg-black/30 shadow-[0_26px_70px_rgba(0,0,0,0.38)]">
            <iframe
              src="https://form.jotform.com/250841370856258?utm_campaign=11023295752"
              title="Funding Application"
              className="h-[1550px] w-full bg-transparent md:h-[1420px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
