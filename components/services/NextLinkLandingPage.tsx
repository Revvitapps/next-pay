import Image from 'next/image';
import { AlertTriangle, ArrowRight, CheckCircle2, MessageSquareMore, Zap } from 'lucide-react';
import ContactForm from '@/components/contact/ContactForm';
import PageShowcaseHero from '@/components/marketing/PageShowcaseHero';
import { getServiceHeroImagePosition, getServiceImage } from '@/lib/content/serviceVisuals';

const problemCards = [
  {
    title: 'Clients, partners, and prospects expect consistent engagement',
    detail: 'but you do not have the time or structure to keep up'
  },
  {
    title: 'You are juggling too many conversations across platforms',
    detail: 'LinkedIn, email, SMS, and nothing is unified'
  },
  {
    title: 'Your outreach is manual and inconsistent',
    detail: 'so scaling B2B efforts feels impossible'
  },
  {
    title: 'Growing your network feels slow and unpredictable',
    detail: 'and momentum is hard to maintain'
  },
  {
    title: 'Hiring more people feels expensive',
    detail: 'but still does not solve the inefficiencies'
  },
  {
    title: 'You do not have time to learn or implement new systems',
    detail: 'so you stay stuck in reactive mode'
  }
];

const riskItems = [
  'Missed opportunities',
  'Slower, inconsistent growth',
  'Outreach that never truly scales',
  'Wasted time on low-value tasks',
  'Losing to competitors with better systems and follow-up'
];

const benefitItems = [
  'Automated outreach campaigns across LinkedIn, email, and more',
  'Consistent, multi-channel engagement without manual effort',
  'A rapidly growing, high-quality professional network',
  'More conversations, meetings, and opportunities on autopilot',
  'Scalable B2B outreach without hiring more staff',
  'Time back for closing deals and high-impact work'
];

const calendlyUrl =
  'https://calendly.com/alexander-nextpaypos/nextpay-partner-meeting-clone?month=2026-04';

export default function NextLinkLandingPage() {
  return (
    <>
      <PageShowcaseHero
        eyebrow={
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-[999px] bg-white px-5 py-2.5 shadow-[0_16px_40px_rgba(0,0,0,0.22)] md:px-6">
              <Image
                src="/logos/nextlink_favicon_02.svg"
                alt="NextLink mark"
                width={30}
                height={30}
                className="h-8 w-8 md:h-9 md:w-9"
              />
              <span className="text-3xl font-extrabold tracking-tight text-[#163c4d] md:text-4xl">
                Next<span className="text-[#46a7a6]">Link</span>
              </span>
            </div>
          </div>
        }
        title="Turn Outreach Into a Scalable Client Engagement System"
        description="Automate follow-up, unify conversations, and grow your professional network across LinkedIn, email, SMS, and more — without adding headcount."
        image={getServiceImage('marketing-outreach-lead-generation')}
        alt="NextLink client engagement platform hero"
        imagePosition={getServiceHeroImagePosition()}
        contentAlignment="center"
        descriptionClassName="mt-12 lg:mt-16"
        ctaClassName="mt-10 lg:mt-12"
        primaryCta={{ label: 'Contact Us', href: '#contact-us' }}
      />

      <section className="px-6 py-14 lg:px-12 lg:py-20">
        <div className="mx-auto grid w-full max-w-[1380px] gap-6 rounded-[32px] border border-white/10 bg-[linear-gradient(180deg,rgba(10,15,20,0.9),rgba(8,12,18,0.94))] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.32)] md:p-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <p className="np-accent text-sm uppercase tracking-[0.2em]">Sound familiar?</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Outreach is important, but the manual work keeps getting in the way
            </h2>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100/90">
              You&apos;re running a growing business, but outbound and relationship-building keep snagging you.
              Your team is capable, yet buried in busywork: endless data entry, repetitive follow-ups,
              scattered conversations, manual tracking. It drains energy and pulls focus away from what
              actually drives growth.
            </p>
            <p className="mt-4 max-w-3xl text-base leading-8 text-slate-100/84">
              After another day of inefficiencies, it&apos;s clear: it&apos;s time to operate smarter. You need a
              better system for engagement and networking, one that lets you scale outreach without scaling
              your workload.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#46a7a6]/20 bg-[radial-gradient(circle_at_top,rgba(70,167,166,0.22),transparent_42%),linear-gradient(180deg,rgba(20,41,54,0.92),rgba(9,16,24,0.94))] p-6 md:p-7">
            <div className="flex items-start gap-4">
              <div className="rounded-2xl border border-[#46a7a6]/30 bg-[#46a7a6]/10 p-3">
                <MessageSquareMore className="h-6 w-6 text-[#8ff7f4]" />
              </div>
              <div>
                <ul className="space-y-3 text-sm leading-7 text-slate-100/88">
                  <li>Manual follow-ups slip through the cracks.</li>
                  <li>Sales and partnership conversations live in too many places.</li>
                  <li>Every growth push depends on more people or more hours.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12 lg:pb-20">
        <div className="mx-auto w-full max-w-[1380px]">
          <p className="np-accent text-sm uppercase tracking-[0.2em]">Here&apos;s what&apos;s likely happening…</p>
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            The growth bottleneck is not effort. It is the system behind the effort.
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {problemCards.map((item) => (
              <article
                key={item.title}
                className="h-full rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(17,23,31,0.94),rgba(10,14,20,0.96))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)]"
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 rounded-full border border-[#46a7a6]/25 bg-[#46a7a6]/10 p-2">
                    <ArrowRight className="h-4 w-4 text-[#8ff7f4]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold leading-7 text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-100/80">{item.detail}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <p className="mt-8 max-w-4xl text-base leading-8 text-slate-100/86">
            These challenges are what keep most businesses from scaling their relationships and outbound
            effectively.
          </p>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12 lg:pb-20">
        <div className="mx-auto w-full max-w-[1380px] rounded-[32px] border border-amber-300/15 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.12),transparent_34%),linear-gradient(180deg,rgba(30,18,10,0.94),rgba(14,10,8,0.98))] p-8 md:p-10">
          <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[132px_minmax(0,1fr)] lg:items-center lg:gap-x-2">
            <div className="flex justify-center lg:min-h-[260px] lg:items-center lg:border-r lg:border-amber-300/12 lg:pr-3">
              <AlertTriangle className="h-14 w-14 text-amber-200 lg:h-20 lg:w-20" />
            </div>
            <div className="flex w-full justify-start text-left lg:justify-self-start">
              <div className="!ml-0 !mr-auto flex w-full max-w-[680px] self-start flex-col items-start text-left">
                <h2 className="font-heading text-3xl font-extrabold tracking-tight text-amber-50 md:text-4xl">
                  What&apos;s at Risk
                </h2>
                <p className="mt-3 text-sm uppercase tracking-[0.2em] text-amber-200/90">
                  If nothing changes…
                </p>
                <ul className="mt-6 flex flex-col space-y-4">
                  {riskItems.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-base font-medium leading-7 text-slate-100/92">
                      <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-amber-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12 lg:pb-20">
        <div className="mx-auto grid w-full max-w-[1380px] gap-8 rounded-[34px] border border-[#46a7a6]/18 bg-[radial-gradient(circle_at_top,rgba(70,167,166,0.12),transparent_30%),linear-gradient(180deg,rgba(12,18,26,0.92),rgba(9,13,19,0.98))] p-8 md:p-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div className="rounded-[28px] border border-dashed border-[#46a7a6]/35 bg-white/[0.03] p-6">
            <div className="mt-5 rounded-[24px] border border-[#46a7a6]/20 bg-white p-5">
              <Image
                src="/logos/nextlink_logos-02_no_tagline.svg"
                alt="NextLink logo"
                width={320}
                height={82}
                className="h-auto w-full max-w-[280px]"
              />
            </div>
            <p className="mt-5 text-sm leading-7 text-slate-100/78">
              NextLink gives your team a dedicated engagement layer for outbound, follow-up, and professional relationship growth.
            </p>
          </div>

          <div>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Meet NextLink
            </h2>
            <p className="mt-3 text-lg font-semibold text-[#b6fffd]">
              Your unfair advantage for client engagement, relationship growth, and scalable B2B outreach.
            </p>
            <p className="mt-5 max-w-3xl text-base leading-8 text-slate-100/88">
              NextLink combines automation with personalization so you can run multi-channel campaigns that
              actually feel human, while expanding your reach far beyond what manual effort allows.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 pb-14 lg:px-12 lg:pb-20">
        <div className="mx-auto w-full max-w-[1380px]">
          <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
            A cleaner system for outreach, follow-up, and relationship growth
          </h2>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {benefitItems.map((item) => (
              <article
                key={item}
                className="h-full rounded-[28px] border border-[#46a7a6]/16 bg-[linear-gradient(180deg,rgba(15,23,31,0.95),rgba(9,14,20,0.96))] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-full border border-[#46a7a6]/30 bg-[#46a7a6]/10 p-2">
                    <CheckCircle2 className="h-4 w-4 text-[#8ff7f4]" />
                  </div>
                  <p className="text-sm font-medium leading-7 text-slate-100/90">{item}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-8 lg:px-12 lg:pb-12">
        <div className="mx-auto w-full max-w-[1380px] rounded-[34px] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(125,217,216,0.12),transparent_32%),linear-gradient(180deg,rgba(11,16,22,0.94),rgba(9,12,18,0.98))] p-8 text-center md:p-10">
          <div className="mx-auto max-w-4xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-[#46a7a6]/28 bg-[#46a7a6]/10">
              <Zap className="h-6 w-6 text-[#8ff7f4]" />
            </div>
            <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Ready to scale engagement without scaling the workload?
            </h2>
            <p className="mt-4 text-base leading-8 text-slate-100/86">
              Tell us where your outreach and relationship-building are getting stuck. We&apos;ll help map the
              right NextLink workflow for your business.
            </p>
          </div>
        </div>
      </section>

      <ContactForm
        sectionId="contact-us"
        sectionClassName="scroll-mt-28 pt-10"
        eyebrow=""
        title="Tell us where outreach is getting stuck"
        description="Share how you are handling outbound, follow-up, and relationship-building today. We will help map the right NextLink workflow for your business."
        submitLabel="Contact Us"
        submittingLabel="Sending..."
        successRedirectUrl={calendlyUrl}
        messagePlaceholder="Tell us where your outreach, follow-up, or relationship-building workflow is breaking down."
        industryPlaceholder="Select your industry"
        hideTurnstileSetupNotice
      />
    </>
  );
}
