import IndustrySelector from '@/components/industries/IndustrySelector';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';

const supportedIndustries = [
  'Restaurants',
  'Hospitality',
  'Retail',
  'Service Businesses',
  'Multi-location Operators'
];

export default function IndustriesPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <div className="px-6 py-16 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/15 bg-slate-950/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Industries We Support</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">
          Industries We Support
        </h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          No matter your size, we right-size an enterprise stack for your workflow.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          {supportedIndustries.map((industry) => (
            <span
              key={industry}
              className="rounded-full border border-white/20 bg-slate-950/90 px-4 py-2 text-sm font-semibold text-zinc-200"
            >
              {industry}
            </span>
          ))}
        </div>
        </section>
      </div>
      <IndustrySelector />
      <SiteFooter />
    </main>
  );
}
