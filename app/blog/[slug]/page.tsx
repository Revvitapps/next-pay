import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { blogPosts, getBlogPostBySlug } from '@/lib/content/blogPosts';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { buildMetadata } from '@/lib/seo/metadata';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/seo/jsonLd';

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return buildMetadata({
      title: 'Article Not Found | Next Pay Business Solutions',
      description: 'The requested blog article could not be found.',
      path: `/blog/${slug}`
    });
  }

  return buildMetadata({
    title: `${post.title} | Next Pay Business Solutions`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.image
  });
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` }
        ])}
      />
      <JsonLd
        data={blogPostingJsonLd({
          headline: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          datePublished: post.datePublished,
          dateModified: post.datePublished
        })}
      />
      <Navbar />
      <div className="px-6 py-20 lg:px-12">
        <article className="mx-auto w-full max-w-4xl overflow-hidden rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90">
          <div className="relative aspect-[16/9] w-full md:aspect-[21/9]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              quality={92}
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
            />
          </div>
          <div className="p-8 md:p-10">
            <p className="text-xs uppercase tracking-[0.16em] text-[#46a7a6]">{post.tag}</p>
            <h1 className="mt-4 font-heading text-4xl font-extrabold tracking-tight text-white md:text-5xl">{post.title}</h1>
            <p className="mt-4 text-sm text-slate-200/80">{post.dateLabel}</p>
            <p className="mt-6 text-base leading-relaxed text-slate-100/95">{post.excerpt}</p>

            <div className="mt-8 space-y-8">
              {post.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="text-2xl font-bold text-white">{section.heading}</h2>
                  <div className="mt-3 space-y-3">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-relaxed text-slate-100/95">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <ul className="mt-4 space-y-2 text-slate-100/90">
                      {section.bullets.map((bullet) => (
                        <li key={bullet} className="flex items-start gap-2">
                          <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#46a7a6]" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </section>
              ))}
            </div>

            <Link
              href="/blog"
              className="mt-10 inline-flex rounded-full border border-[#46a7a6]/40 px-5 py-2 text-sm font-semibold text-[#46a7a6] transition hover:border-[#46a7a6]/70"
            >
              Back to Blog
            </Link>
          </div>
        </article>
      </div>
      <SiteFooter />
    </main>
  );
}
