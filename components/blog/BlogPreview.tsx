'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight, NotebookPen } from 'lucide-react';

const posts = [
  {
    category: 'Business Infrastructure',
    title: 'Building a Connected Business Stack',
    excerpt: 'A framework for aligning operations, integrations, and service delivery without added complexity.'
  },
  {
    category: 'Integrations',
    title: 'How Integrations Reduce Operational Drag',
    excerpt:
      'Connect core tools and data so teams spend less time on manual updates and more time on execution.'
  },
  {
    category: 'Service Enablement',
    title: 'Scaling Service Businesses with Better Infrastructure',
    excerpt: 'The checkpoints that keep multi-location rollouts consistent, reliable, and easy to manage.'
  }
];

export default function BlogPreview() {
  return (
    <section id="blog" className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan-200/85">Blog Preview</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Insights for teams scaling modern business infrastructure
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-zinc-300">
            Short reads for teams mapping operations, integrations, and rollout playbooks.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.06 }}
              className="group rounded-2xl border border-white/10 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-cyan-200/50"
            >
              <div className="rounded-xl border border-white/10 bg-gradient-to-br from-cyan-300/15 to-violet-300/10 p-4">
                <NotebookPen className="h-5 w-5 text-cyan-200" />
              </div>
              <p className="mt-4 text-xs uppercase tracking-[0.17em] text-zinc-400">{post.category}</p>
              <h3 className="mt-2 text-lg font-bold text-zinc-100">{post.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{post.excerpt}</p>
              <button type="button" className="mt-5 flex items-center gap-1 text-sm font-semibold text-cyan-200">
                Read preview
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
