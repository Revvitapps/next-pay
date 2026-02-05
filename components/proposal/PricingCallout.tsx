type PricingCalloutProps = {
  title: string;
  lines: string[];
  highlight?: boolean;
};

export default function PricingCallout({ title, lines, highlight = false }: PricingCalloutProps) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? 'border-cyan-300/55 bg-cyan-300/10 text-cyan-50 shadow-glow'
          : 'border-white/10 bg-white/5 text-zinc-100'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <span className={`mt-1 h-1.5 w-1.5 rounded-full ${highlight ? 'bg-cyan-100' : 'bg-cyan-300'}`} />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
