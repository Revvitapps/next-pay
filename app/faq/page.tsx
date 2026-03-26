import type { Metadata } from 'next';
import PageHero from '@/components/ui/PageHero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import { paymentsTrustLogos } from '@/lib/content/logos';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, faqPageJsonLd } from '@/lib/seo/jsonLd';

const faqItems = [
  {
    question: 'What services does NextPay offer?',
    answer: 'Core offerings include payroll, workers compensation, business financing, HR benefits, time attendance, tax credit advisory, and POS payments.'
  },
  {
    question: 'How are leads routed after submission?',
    answer: 'All leads are captured internally first and then routed to the relevant NextPay advisory queue using service and qualification rules.'
  },
  {
    question: 'Can one business submit for multiple services?',
    answer: 'Yes. You can submit separate service forms or request a broader consultation through the contact page.'
  }
];

export const metadata: Metadata = buildMetadata({
  title: 'FAQ | NextPay',
  description: 'Answers to common questions about service offerings, lead routing, and consultation workflows.',
  path: '/faq'
});

export default function FaqPage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' }
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqItems)} />
      <Navbar />
      <PageHero
        eyebrow="FAQ"
        title="Frequently Asked Questions"
        description="Answers to common questions about service offerings, lead routing, and consultation workflows."
        image="/images/financial-workflows.png"
        imageAlt="Financial workflows and operational systems visual"
        chips={['Services', 'Routing', 'Consultation', 'Workflow']}
        primaryCta={{ label: 'Start Your Journey', href: '/contact?intent=quote' }}
        secondaryCta={{ label: 'Contact NextPay', href: '/contact' }}
        trustBand={{
          eyebrow: '',
          title: 'Trusted Network',
          logos: paymentsTrustLogos
        }}
      />
      <div className="px-6 py-20 lg:px-12">
        <section className="mx-auto w-full max-w-5xl rounded-3xl border border-[#46a7a6]/25 bg-[#163c4d]/90 p-8 md:p-10">
          <div className="mt-8 space-y-4">
            {faqItems.map((item) => (
              <article key={item.question} className="rounded-2xl border border-[#46a7a6]/25 bg-[#163c4d]/80 p-5">
                <h2 className="text-lg font-bold text-white">{item.question}</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-100/90">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
      <SiteFooter />
    </main>
  );
}
