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
          ? 'border-[#46a7a6]/55 bg-[#46a7a6]/10 text-white shadow-glow'
          : 'border-[#46a7a6]/25 bg-[#163c4d]/75 text-white'
      }`}
    >
      <p className="text-xs uppercase tracking-[0.2em] text-slate-200/80">{title}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed">
        {lines.map((line) => (
          <li key={line} className="flex gap-2">
            <span className={`mt-1 h-1.5 w-1.5 rounded-full ${highlight ? 'bg-[#46a7a6]' : 'bg-[#46a7a6]'}`} />
            <span>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
