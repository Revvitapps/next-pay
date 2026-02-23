import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import UserbackEdgeButton from '@/components/analytics/UserbackEdgeButton';
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

const userbackToken = process.env.NEXT_PUBLIC_USERBACK_TOKEN ?? 'A-HoZrXnPGvJoEmiC0zM7LtT2iN';

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
        <Script
          id="userback-config"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.Userback = window.Userback || {};
              window.Userback.access_token = "${userbackToken}";
              window.Userback.is_live = true;
              window.Userback.widget_settings = {
                trigger_type: "page_load",
                style: "text",
                position: "left"
              };
              window.Userback.user_data = {
                id: "nextpay-public-visitor",
                info: {
                  name: "Website Visitor",
                  email: "visitor@nextpaypos.com"
                }
              };
            `
          }}
        />
        <Script
          id="userback-loader"
          src="https://static.userback.io/widget/v1.js"
          strategy="afterInteractive"
        />
        <UserbackEdgeButton />
        <GradientBackground />
        {children}
      </body>
    </html>
  );
}
