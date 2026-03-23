type StatusBadgeProps = {
  label: string;
  tone?: 'neutral' | 'info' | 'warning' | 'success' | 'danger';
};

const toneClasses: Record<NonNullable<StatusBadgeProps['tone']>, string> = {
  neutral: 'border-slate-500/40 bg-slate-700/40 text-slate-200',
  info: 'border-sky-500/40 bg-sky-500/15 text-sky-200',
  warning: 'border-amber-500/40 bg-amber-500/15 text-amber-200',
  success: 'border-emerald-500/40 bg-emerald-500/15 text-emerald-200',
  danger: 'border-rose-500/40 bg-rose-500/15 text-rose-200'
};

export default function StatusBadge({ label, tone = 'neutral' }: StatusBadgeProps) {
  return <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{label}</span>;
}
