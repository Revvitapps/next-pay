'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import PricingCallout from '@/components/proposal/PricingCallout';
import { track } from '@/lib/utils';

function Divider() {
  return <hr className="my-10 border-white/10" />;
}

export default function ProposalSections() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-20">
      <section className="rounded-3xl border border-white/15 bg-slate-950/80 p-6 backdrop-blur-sm md:p-10">
        <h2 className="font-heading text-3xl font-extrabold tracking-tight text-white">PARTNERSHIP &amp; PLATFORM PROPOSAL</h2>

        <Divider />

        <article>
          <h3 className="text-2xl font-bold text-cyan-100">What We&apos;re Building</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200">
            We&apos;re delivering a fully integrated, conversion-first platform designed to support your payments, POS,
            and merchant services sales motion — while establishing a long-term strategic partnership between our
            teams.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200">This is not a generic website.</p>
          <p className="mt-1 text-sm leading-relaxed text-zinc-200">
            It&apos;s a revenue system built to educate prospects, capture intent, route leads, and seamlessly connect
            payments, subscriptions, and integrations.
          </p>
        </article>

        <Divider />

        <article id="phase-1">
          <h3 className="text-2xl font-bold text-cyan-100">PHASE 1: Custom Website + Funnel Build (Partner Rate)</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200">
            We will design and deploy a sleek, mobile-first website and sales funnel tailored specifically to your
            brand, verticals, and payment offerings.
          </p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">What&apos;s Included:</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {[
              'Custom homepage + service pages (payments, POS, subscriptions, financing)',
              'Conversion-optimized funnel architecture',
              'Lead capture and qualification flows',
              'Mobile-first UX (built for real buyers)',
              'SEO-ready structure and analytics foundation',
              'Scalable framework for future funnels and integrations'
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <PricingCallout
              title="Standard Value"
              lines={['$5,000 one-time setup', '$750/month ongoing support & optimization']}
            />
            <PricingCallout
              title="Partner-Only Investment"
              highlight
              lines={[
                '$2,000 total setup',
                '$1,000 due at project start',
                '$1,000 due upon completion',
                '$100/month ongoing support'
              ]}
            />
          </div>

          <p className="mt-5 text-sm text-zinc-300">This pricing reflects a strategic partner rate and is not public pricing.</p>
        </article>

        <Divider />

        <article id="phase-2">
          <h3 className="text-2xl font-bold text-cyan-100">PHASE 2: Partnership Development Framework</h3>
          <p className="mt-4 text-sm leading-relaxed text-zinc-200">
            Beyond the platform itself, we&apos;re proposing an ongoing partnership designed to create shared upside
            without operational complexity.
          </p>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">Referral Model:</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {[
              'You refer a client who needs a website, funnel, or automation',
              'We handle delivery end-to-end',
              'You receive 30% of the one-time setup fee',
              'We retain 100% of the monthly retainer'
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-zinc-300">This keeps accounting clean while rewarding qualified referrals.</p>
        </article>

        <Divider />

        <article>
          <h3 className="text-2xl font-bold text-cyan-100">Integration &amp; API Services</h3>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">Services Include:</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {['API integrations', 'Payment gateway setup', 'Subscription and billing logic', 'POS and CRM synchronization'].map(
              (item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                  <span>{item}</span>
                </li>
              )
            )}
          </ul>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">Pricing:</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {['$150 per hour', '5-hour minimum ($750 minimum per engagement)'].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <h4 className="mt-6 text-sm font-semibold uppercase tracking-[0.15em] text-cyan-200">These services are:</h4>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {['Sold directly by your team', 'Delivered by your team', 'Independent of our retainer model'].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <Divider />

        <article>
          <h3 className="text-2xl font-bold text-cyan-100">Optional: Fully Integrated Funnel Builds (White-Label Ready)</h3>
          <p className="mt-4 text-sm text-zinc-200">We can also provide ready-to-deploy sales funnels for your clients, including:</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {[
              'Hosted landing pages',
              'Embedded payment and checkout flows',
              'Subscription logic',
              'Mobile-optimized, deployable anywhere'
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-5 text-sm text-zinc-200">These can be positioned as:</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {['Add-ons', 'Upsells', 'Or bundled offers with merchant services'].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <Divider />

        <article>
          <h3 className="text-2xl font-bold text-cyan-100">Why This Works</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-200">
            {[
              'You focus on selling payments and POS',
              'We handle conversion, trust, and infrastructure',
              'Clients get one cohesive system',
              'No overlapping responsibilities',
              'No revenue confusion',
              'Built to scale long-term'
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm text-zinc-200">
            This partnership is designed to increase close rates, improve retention, and raise average deal size
            without adding operational drag.
          </p>
        </article>

        <Divider />

        <article>
          <h3 className="text-2xl font-bold text-cyan-100">Next Steps</h3>
          <ol className="mt-4 space-y-2 text-sm text-zinc-200">
            {[
              'Approve Phase 1 build and partner pricing',
              'Finalize scope and launch timeline',
              'Deploy prototype → live platform',
              'Activate referral and integration framework'
            ].map((item, index) => (
              <li key={item} className="flex gap-3">
                <span className="font-semibold text-cyan-200">{index + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </article>

        <Divider />

        <article>
          <h3 className="text-2xl font-bold text-cyan-100">Internal Build Notes (for Codex / Engineering Context)</h3>
          <ul className="mt-4 space-y-2 text-sm text-zinc-200">
            {[
              'Tone: premium SaaS, clean, confident',
              'Focus: payments-centric funnels + partner scalability',
              'Emphasis: ownership, automation, conversion, trust',
              'Avoid: generic "web design" language',
              'Outcome: revenue system, not a website'
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        className="mt-10 rounded-3xl border border-cyan-300/45 bg-gradient-to-br from-cyan-300/12 to-slate-900 p-6 md:p-8"
      >
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-100">Decision Block</p>
        <h3 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white">Ready to greenlight Phase 1?</h3>
        <p className="mt-3 text-sm text-zinc-200">
          Partner Investment: $2,000 setup total and $100/month ongoing support. Payment schedule: $1,000 due at
          project start, $1,000 due upon completion.
        </p>

        <ul className="mt-5 space-y-2 text-sm text-zinc-200">
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-200" />
            Partner Investment summary includes setup + monthly support.
          </li>
          <li className="flex gap-2">
            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-200" />
            Payment schedule aligned to build kickoff and completion.
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="mailto:partnerships@nextpaypos.com?subject=Approve%20Phase%201%20Build"
            onClick={() => track('proposal_cta_click', { source: 'proposal_decision_primary' })}
            className="rounded-full bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
          >
            Approve Phase 1 + Start Build
          </Link>
          <Link
            href="/#contact"
            onClick={() => track('book_call_click', { source: 'proposal_decision_secondary' })}
            className="rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-zinc-100 transition hover:border-cyan-200/70 hover:bg-cyan-300/10"
          >
            Schedule Kickoff Call
          </Link>
        </div>
      </motion.section>

      <section className="mt-6 rounded-2xl border border-white/15 bg-slate-950/80 px-5 py-4 text-sm text-zinc-300 backdrop-blur-sm">
        <span className="font-semibold text-zinc-100">Questions?</span> Email: partnerships@nextpaypos.com | Phone:
        (000) 000-0000
      </section>
    </div>
  );
}
