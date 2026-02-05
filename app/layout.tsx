import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import { GradientBackground } from '@/components/visuals/GradientBackground';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  display: 'swap'
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'NEXT-PAY | Next Pay Business Solutions',
  description:
    'Infrastructure for modern business with connected operations, integrations, and financial workflows.',
  openGraph: {
    title: 'NEXT-PAY | Next Pay Business Solutions',
    description:
      'Infrastructure for modern business with connected operations, integrations, and financial workflows.',
    images: ['/images/updated-main-hero.jpeg']
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/images/updated-main-hero.jpeg']
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${jakarta.variable} ${spaceGrotesk.variable} bg-[#05060A] font-body text-zinc-100 antialiased`}>
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
