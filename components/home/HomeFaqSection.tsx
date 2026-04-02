import Link from 'next/link';
import { homeFaqItems } from '@/lib/content/faqs';
import { quizMessaging } from '@/lib/content/quizMessaging';

export default function HomeFaqSection() {
  return (
    <section className="px-6 py-20 lg:px-12">
      <div className="np-surface mx-auto w-full max-w-[1380px] rounded-3xl p-8 md:p-10">
        <p className="np-accent text-sm uppercase tracking-[0.2em]">FAQ</p>
        <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
          Common questions before choosing a payment or POS setup
        </h2>
        <p className="mt-3 max-w-4xl text-sm leading-relaxed text-slate-100/84">
          If you are still figuring out what you need, start here. If you want a faster path, take the quiz and we&apos;ll help narrow what fits your business next.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="rounded-full border border-[#46a7a6]/28 bg-[#46a7a6]/10 px-4 py-2 text-sm font-medium text-slate-100/92">
            {quizMessaging.curiosity[3]}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-100/78">
            {quizMessaging.action[3]}
          </span>
        </div>
        <div className="mt-8 space-y-4">
          {homeFaqItems.map((item) => (
            <details key={item.question} className="group np-card rounded-2xl p-5 text-left">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-bold text-white marker:hidden">
                <span>{item.question}</span>
                <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#46a7a6]/35 text-xl font-semibold text-[#7dd9d8] transition duration-300 group-hover:border-[#8ff7f4]/70 group-hover:text-[#b6fffd] group-hover:shadow-[0_0_16px_rgba(70,167,166,0.35)] group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-100/86">{item.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/pricing#custom-quote"
            className="inline-flex rounded-full border border-[#46a7a6]/40 bg-accent-gradient px-6 py-3 text-sm font-semibold text-slate-950 shadow-glow transition hover:brightness-110"
          >
            Take The Quiz
          </Link>
          <Link
            href="/faq"
            className="np-button-secondary inline-flex rounded-full px-6 py-3 text-sm font-semibold transition"
          >
            View Full FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
