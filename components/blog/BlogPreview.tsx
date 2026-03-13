'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { blogPosts } from '@/lib/content/blogPosts';

export default function BlogPreview() {
  return (
    <section id="blog" className="px-6 py-20 lg:px-12">
      <div className="mx-auto w-full max-w-none">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Blog Preview</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold tracking-tight text-white md:text-4xl">
              Insights for teams scaling modern business infrastructure
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-slate-100/90">
            Short reads for teams mapping operations, integrations, and rollout playbooks.
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: index * 0.06 }}
              className="h-full"
            >
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/85 transition hover:-translate-y-1 hover:border-[#46a7a6]/50"
              >
                <div className="relative h-[150px] w-full overflow-hidden rounded-t-2xl bg-[#0f3443] sm:h-[160px] md:h-[170px] lg:h-[180px]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    quality={90}
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs uppercase tracking-[0.17em] text-slate-200/80">{post.tag}</p>
                  <h3 className="mt-2 text-lg font-bold text-white">{post.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/90">{post.excerpt}</p>
                  <span className="mt-auto pt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#46a7a6]">
                    Read article
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
