'use client';

import CatalogQuizExperience from '@/components/quiz/CatalogQuizExperience';

type GuidedSolutionQuizProps = {
  industries: Array<{ id: string; label: string }>;
};

export default function GuidedSolutionQuiz(_: GuidedSolutionQuizProps) {
  return <CatalogQuizExperience />;
}
