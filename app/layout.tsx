import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import UserbackBootstrap from '@/components/analytics/UserbackBootstrap';
import JsonLd from '@/components/seo/JsonLd';
import { GradientBackground } from '@/components/visuals/GradientBackground';
import { buildMetadata } from '@/lib/seo/metadata';
import { localBusinessJsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo/jsonLd';
import { siteUrl } from '@/lib/seo/site';
import './globals.css';

const roboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '700', '900']
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...buildMetadata({
    title: 'NEXT-PAY | Next Pay Business Solutions',
    description: 'Infrastructure for modern business with connected operations, integrations, and financial workflows.',
    path: '/'
  })
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${roboto.variable} bg-[#163c4d] font-body text-slate-50 antialiased`}>
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={localBusinessJsonLd()} />
        <UserbackBootstrap />
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
