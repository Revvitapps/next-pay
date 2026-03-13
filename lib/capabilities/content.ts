import { cache } from 'react';
import { promises as fs } from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const CAPABILITIES_DIR = path.join(process.cwd(), 'content/capabilities');
const CONTENT_EXTENSIONS = ['.md', '.mdx'] as const;

const CAPABILITY_IMAGE_FALLBACKS: Record<string, string> = {
  'business-operations': '/images/business-operations.png',
  'financial-workflows': '/images/financial-workflows.png',
  'technology-integrations': '/images/technology-integrations.png',
  'automation-enablement': '/images/automation-enablement.png',
  'reporting-visibility': '/images/reporting-visibility.png',
  'partner-ready-support': '/images/partner-ready-support.png'
};

export type CapabilityFrontmatter = {
  title: string;
  slug: string;
  category: string;
  description: string;
  image?: string;
  featured?: boolean;
  order: number;
};

export type CapabilityHeading = {
  id: string;
  text: string;
  level: number;
};

export type CapabilityListItem = Omit<CapabilityFrontmatter, 'image'> & {
  image: string;
  excerpt: string;
  readingTimeMinutes: number;
};

export type CapabilityEntry = CapabilityListItem & {
  markdown: string;
  html: string;
  headings: CapabilityHeading[];
};

function toListItem({ markdown, html, headings, ...listItem }: CapabilityEntry): CapabilityListItem {
  void markdown;
  void html;
  void headings;
  return listItem;
}

function hasContentExtension(fileName: string) {
  return CONTENT_EXTENSIONS.some((ext) => fileName.endsWith(ext));
}

function stripContentExtension(fileName: string) {
  return fileName.replace(/\.(md|mdx)$/, '');
}

function resolveCapabilityImage(slug: string, image?: string) {
  return image || CAPABILITY_IMAGE_FALLBACKS[slug] || '/images/business-operations.png';
}

function toSlugId(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

function extractExcerpt(markdown: string) {
  const paragraph = markdown
    .replace(/^#\s.+$/m, '')
    .split('\n\n')
    .map((block) => block.trim())
    .find((block) => block.length > 80 && !block.startsWith('##') && !block.startsWith('-'));

  return paragraph ? paragraph.replace(/\s+/g, ' ') : markdown.slice(0, 180);
}

function extractHeadings(markdown: string): CapabilityHeading[] {
  const lines = markdown.split('\n');
  const headings: CapabilityHeading[] = [];

  for (const line of lines) {
    const match = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length;
    const text = match[2].trim();
    headings.push({
      id: toSlugId(text),
      text,
      level
    });
  }

  return headings;
}

async function markdownToHtml(markdown: string) {
  const rendered = await remark().use(remarkGfm).use(remarkHtml).process(markdown);
  let html = String(rendered);

  const headings = extractHeadings(markdown);
  for (const heading of headings) {
    const headingTag = heading.level === 2 ? 'h2' : 'h3';
    const pattern = new RegExp(`<${headingTag}>${heading.text}</${headingTag}>`);
    html = html.replace(pattern, `<${headingTag} id="${heading.id}">${heading.text}</${headingTag}>`);
  }

  return html;
}

async function readCapabilityFile(fileName: string): Promise<CapabilityEntry> {
  const filePath = path.join(CAPABILITIES_DIR, fileName);
  const source = await fs.readFile(filePath, 'utf8');
  const parsed = matter(source);
  const frontmatter = parsed.data as CapabilityFrontmatter;
  const slug = frontmatter.slug || stripContentExtension(fileName);

  const markdown = parsed.content.trim();
  const html = await markdownToHtml(markdown);

  return {
    ...frontmatter,
    slug,
    image: resolveCapabilityImage(slug, frontmatter.image),
    excerpt: extractExcerpt(markdown),
    readingTimeMinutes: estimateReadingTime(markdown),
    markdown,
    html,
    headings: extractHeadings(markdown)
  };
}

export const getAllCapabilities = cache(async (): Promise<CapabilityListItem[]> => {
  const files = await fs.readdir(CAPABILITIES_DIR);
  const entries = await Promise.all(files.filter(hasContentExtension).map(readCapabilityFile));

  return entries.sort((a, b) => a.order - b.order).map(toListItem);
});

export const getCapabilityBySlug = cache(async (slug: string): Promise<CapabilityEntry | null> => {
  const files = await fs.readdir(CAPABILITIES_DIR);
  const mdFile = files.find((fileName) => hasContentExtension(fileName) && stripContentExtension(fileName) === slug);

  if (!mdFile) {
    return null;
  }

  return readCapabilityFile(mdFile);
});

export async function getRelatedCapabilities(currentSlug: string, count = 3) {
  const allCapabilities = await getAllCapabilities();
  const currentIndex = allCapabilities.findIndex((item) => item.slug === currentSlug);

  if (currentIndex === -1) {
    return allCapabilities.slice(0, count);
  }

  const after = allCapabilities.slice(currentIndex + 1);
  const before = allCapabilities.slice(0, currentIndex);

  return [...after, ...before].slice(0, count);
}

export async function getCapabilityNeighbors(currentSlug: string) {
  const allCapabilities = await getAllCapabilities();
  const index = allCapabilities.findIndex((item) => item.slug === currentSlug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: allCapabilities[index - 1] ?? null,
    next: allCapabilities[index + 1] ?? null
  };
}
