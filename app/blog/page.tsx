import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';

const posts = [
  {
    title: 'Building a Connected Business Stack',
    excerpt:
      'How to align operations, financial workflows, and integrations into one practical system for day-to-day execution.',
    tag: 'Business Infrastructure',
    date: 'February 2026'
  },
  {
    title: 'How Integrations Reduce Operational Drag',
    excerpt:
      'A practical framework for connecting tools, reducing rework, and improving visibility across teams.',
    tag: 'Integrations',
    date: 'February 2026'
  },
  {
    title: 'Enterprise-grade Systems for Growing Businesses',
    excerpt:
      'What right-sized enterprise infrastructure looks like when you need reliability, security, and speed without complexity.',
    tag: 'Growth Strategy',
    date: 'February 2026'
  }
];

export default function BlogPage() {
  return (
    <main className="pt-16">
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-white/15 bg-slate-950/85 p-8 md:p-10">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Blog</p>
        <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">Insights</h1>
        <p className="mt-4 max-w-3xl text-zinc-300">
          Practical guidance for teams modernizing operations, integrations, and financial workflows.
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="rounded-2xl border border-white/15 bg-slate-950/90 p-5">
              <p className="text-xs uppercase tracking-[0.16em] text-cyan-200">{post.tag}</p>
              <h2 className="mt-3 text-xl font-bold text-white">{post.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{post.excerpt}</p>
              <p className="mt-4 text-xs text-zinc-400">{post.date}</p>
            </article>
          ))}
        </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
