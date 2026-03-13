import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { blogPosts } from '@/lib/content/blogPosts';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Blog | Next Pay Business Solutions',
  description: 'Insights on business infrastructure, operational integrations, and payment workflow execution.',
  path: '/blog'
});

export default function BlogPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' }
        ])}
      />
      {blogPosts.slice(0, 1).map((post) => (
        <JsonLd
          key={post.slug}
          data={blogPostingJsonLd({
            headline: post.title,
            description: post.excerpt,
            path: `/blog/${post.slug}`,
            datePublished: post.datePublished,
            dateModified: post.datePublished
          })}
        />
      ))}
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-6xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/85 p-8 md:p-10">
          <p className="text-sm uppercase tracking-[0.2em] text-[#46a7a6]/85">Blog</p>
          <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">Insights</h1>
          <p className="mt-4 max-w-3xl text-slate-100/90">
            Practical guidance for teams modernizing operations, integrations, and financial workflows.
          </p>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/90 transition hover:-translate-y-1 hover:border-[#46a7a6]/50"
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
                  <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{post.tag}</p>
                  <h2 className="mt-3 text-xl font-bold text-white">{post.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-slate-100/90">{post.excerpt}</p>
                  <p className="mt-4 text-xs text-slate-200/80">{post.dateLabel}</p>
                  <span className="mt-auto pt-4 inline-flex text-sm font-semibold text-[#46a7a6] transition group-hover:text-[#7dd9d8]">
                    Read article
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
