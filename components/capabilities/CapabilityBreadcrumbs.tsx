import Link from 'next/link';

type CapabilityBreadcrumbsProps = {
  title: string;
};

export default function CapabilityBreadcrumbs({ title }: CapabilityBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm text-slate-200/80">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition hover:text-[#46a7a6]">
            Home
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li>
          <Link href="/capabilities" className="transition hover:text-[#46a7a6]">
            Capabilities
          </Link>
        </li>
        <li aria-hidden="true">/</li>
        <li className="text-white">{title}</li>
      </ol>
    </nav>
  );
}
