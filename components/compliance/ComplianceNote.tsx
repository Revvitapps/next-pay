import { complianceCopy } from '@/lib/content/compliance';

type ComplianceNoteProps = {
  tone?: 'default' | 'soft';
  text: keyof typeof complianceCopy | string;
  className?: string;
};

export default function ComplianceNote({ tone = 'default', text, className }: ComplianceNoteProps) {
  const resolvedText = text in complianceCopy ? complianceCopy[text as keyof typeof complianceCopy] : text;

  return (
    <p
      className={[
        'text-xs leading-relaxed',
        tone === 'soft' ? 'text-slate-300/80' : 'text-slate-200/85',
        className ?? ''
      ]
        .join(' ')
        .trim()}
    >
      {resolvedText}
    </p>
  );
}
