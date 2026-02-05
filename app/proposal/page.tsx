import Navbar from '@/components/nav/Navbar';
import ProposalSections from '@/components/proposal/ProposalSections';

const proposalTiles = Array.from({ length: 240 });

export default function ProposalPage() {
  return (
    <main className="relative isolate">
      <div
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      >
        <div className="absolute inset-0 opacity-[0.11]">
          <div className="grid h-full w-full auto-rows-[170px] grid-cols-[repeat(auto-fill,minmax(360px,1fr))]">
            {proposalTiles.map((_, index) => {
              const useNextPay = index % 2 === 1;

              return (
                <div
                  key={index}
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage: useNextPay
                      ? "url('/images/proposal-background.jpg')"
                      : "url('/images/revvit-mockup-copy.jpg')"
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className="absolute inset-0 bg-[#05060A]/94" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(34,211,238,0.1),transparent_40%)]" />
      </div>

      <Navbar mode="proposal" />
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto w-full max-w-5xl rounded-2xl border border-white/15 bg-slate-950/80 p-6 backdrop-blur-sm md:p-8">
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Next Pay Business Solutions</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Partnership &amp; Platform Proposal
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-300">
            A conversion-first platform designed to support business services including financial workflows,
            integrations, subscriptions, and infrastructure — plus a referral framework that creates shared upside.
          </p>
        </div>
      </section>
      <ProposalSections />
    </main>
  );
}
