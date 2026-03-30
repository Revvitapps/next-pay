import type { Metadata } from 'next';
import ContactForm from '@/components/contact/ContactForm';
import StatementUploadForm from '@/components/contact/StatementUploadForm';
import PageHero from '@/components/ui/PageHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { paymentsTrustLogos } from '@/lib/content/logos';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, contactPageJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'Contact | NextPay',
  description: 'Request a consultation, quote, or statement savings analysis from NextPay.',
  path: '/contact'
});

export default function ContactPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' }
        ])}
      />
      <JsonLd data={contactPageJsonLd()} />
      <Navbar />
      <PageHero
        eyebrow="Contact"
        title="Let&apos;s Plan Your Rollout"
        description="Tell us about your locations, workflow needs, and timeline. We will map a recommended stack and next-step implementation plan."
        image="/images/top-right-image.jpg"
        imageAlt="NextPay contact and rollout planning visual"
        chips={['Quote', 'Statement Review', 'Implementation', 'Support']}
        primaryCta={{ label: 'Start Your Journey', href: '/pricing#custom-quote' }}
        secondaryCta={{ label: 'Review Services', href: '/services' }}
        trustBand={{
          eyebrow: '',
          title: 'Trusted Network',
          logos: paymentsTrustLogos
        }}
      />
      <ContactForm />
      <StatementUploadForm />
      <SiteFooter />
    </main>
  );
}
