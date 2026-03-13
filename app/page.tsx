import type { Metadata } from 'next';
import BlogPreview from '@/components/blog/BlogPreview';
import CaseStudies from '@/components/case-studies/CaseStudies';
import FeaturesGrid from '@/components/features/FeaturesGrid';
import Hero from '@/components/hero/Hero';
import Navbar from '@/components/nav/Navbar';
import SiteFooter from '@/components/nav/SiteFooter';
import JsonLd from '@/components/seo/JsonLd';
import ServicesSection from '@/components/services/ServicesSection';
import TerminalCards from '@/components/terminals/TerminalCards';
import Testimonials from '@/components/testimonials/Testimonials';
import MotionDiv from '@/components/visuals/MotionDiv';
import { buildMetadata } from '@/lib/seo/metadata';
import { breadcrumbJsonLd, serviceJsonLd } from '@/lib/seo/jsonLd';

export const metadata: Metadata = buildMetadata({
  title: 'NEXT-PAY | Next Pay Business Solutions',
  description: 'Business infrastructure and partner services for payroll, workers comp, financing, POS payments, and operations.',
  path: '/'
});

export default function HomePage() {
  return (
    <main className="pt-16">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', path: '/' }
        ])}
      />
      <JsonLd
        data={serviceJsonLd({
          name: 'Business Infrastructure Services',
          description: 'Connected operations, payments, and partner-led services for growing businesses.',
          path: '/services'
        })}
      />
      <Navbar />
      <Hero />
      <FeaturesGrid />
      <ServicesSection />
      <TerminalCards />
      <Testimonials />
      <CaseStudies />
      <BlogPreview />
      <MotionDiv variant="left">
        <SiteFooter />
      </MotionDiv>
    </main>
  );
}
