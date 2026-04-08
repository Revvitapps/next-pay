'use client';

import Image from 'next/image';
import Link from 'next/link';
import MotionDiv from '@/components/visuals/MotionDiv';

export default function BusinessFinancingHero() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-20 lg:px-12 lg:pb-20">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,24,30,0.98),rgba(13,34,42,0.94)_55%,rgba(6,8,11,0)_55%)]" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 25px 25px, rgba(125,217,216,0.1) 2px, transparent 0), radial-gradient(circle at 0 0, rgba(125,217,216,0.06) 2px, transparent 0)',
          backgroundSize: '48px 48px'
        }}
      />

      <div className="relative mx-auto w-full max-w-[1380px]">
        <MotionDiv className="text-center" variant="up">
          <p className="text-xs uppercase tracking-[0.22em] text-[#7dd9d8]">Business Financing & Funding</p>
          <h1 className="mx-auto mt-4 max-w-4xl font-heading text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Get Funded Fast with flexible capital options for growth, equipment, and real estate
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-100/84 md:text-base">
            Faster application flow, soft-pull positioning, and business or real-estate funding paths built into one
            active application.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="#funding-application"
              className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
            >
              Get Qualified
            </Link>
            <Link
              href="#funding-programs"
              className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
            >
              Review Funding Options
            </Link>
          </div>

          <div className="mt-6 inline-flex rounded-full border border-white/10 bg-black/20 px-4 py-2 text-xs font-semibold text-slate-100/80">
            Trusted partner-style financing flow, adapted to the current NextPay site
          </div>
        </MotionDiv>

        <div className="relative mt-14 grid min-h-[320px] items-end gap-5 md:grid-cols-[0.72fr_1fr_0.72fr]">
          <MotionDiv className="relative z-10 justify-self-center md:justify-self-end" variant="left" delay={0.08}>
            <div className="relative h-[130px] w-[200px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_18px_48px_rgba(0,0,0,0.32)] md:h-[170px] md:w-[260px]">
              <Image
                src="/images/67e39bb97f14af7c0a8dbe3b_two-colleagues-having-conversation-at-work-in-indu-2024-07-18-16-03-27-utc 1.avif"
                alt="Equipment financing preview"
                fill
                sizes="(max-width: 768px) 200px, 260px"
                className="object-cover object-center"
              />
            </div>
          </MotionDiv>

          <MotionDiv className="relative z-20 justify-self-center" variant="up" delay={0.12}>
            <div className="relative h-[260px] w-[320px] overflow-hidden rounded-[32px] border border-white/10 shadow-[0_26px_80px_rgba(0,0,0,0.4)] md:h-[360px] md:w-[420px]">
              <Image
                src="/images/67e39bb97f14af7c0a8dbdcc_mission-02.avif"
                alt="Funding hero visual"
                fill
                priority
                sizes="(max-width: 768px) 320px, 420px"
                className="object-cover object-[center_18%]"
              />
            </div>
          </MotionDiv>

          <MotionDiv className="relative z-10 justify-self-center md:justify-self-start" variant="right" delay={0.16}>
            <div className="relative h-[130px] w-[200px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_18px_48px_rgba(0,0,0,0.32)] md:h-[170px] md:w-[260px]">
              <Image
                src="/images/67e39bb97f14af7c0a8dbe39_young-millennial-woman-shopping-at-a-local-small-b-2024-11-01-02-33-26-utc (1).avif"
                alt="Revenue financing preview"
                fill
                sizes="(max-width: 768px) 200px, 260px"
                className="object-cover object-center"
              />
            </div>
          </MotionDiv>
        </div>
      </div>
    </section>
  );
}
