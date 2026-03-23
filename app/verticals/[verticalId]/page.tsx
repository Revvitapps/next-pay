import { redirect } from 'next/navigation';

type VerticalDetailPageProps = {
  params: Promise<{ verticalId: string }>;
};

const verticalToIndustryMap: Record<string, string> = {
  'law-firms': 'professional-and-business-services',
  'real-estate': 'professional-and-business-services',
  automotive: 'automotive-businesses',
  medical: 'healthcare-and-medical-practices',
  'home-services': 'home-services-and-contractors',
  barbershops: 'beauty-and-personal-care',
  'ott-streaming': 'entertainment-and-specialty-businesses'
};

export default async function VerticalDetailPage({ params }: VerticalDetailPageProps) {
  const { verticalId } = await params;
  const mappedIndustryId = verticalToIndustryMap[verticalId];

  if (mappedIndustryId) {
    redirect(`/industries/${mappedIndustryId}`);
  }

  redirect('/industries');
}
