import type { ReactNode } from 'react';

type ReviewShellProps = {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
};

export default function ReviewShell({ eyebrow, title, description, children }: ReviewShellProps) {
  return (
    <section className="px-6 py-16 lg:px-12">
      <div className="mx-auto w-full max-w-[1380px] rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(8,11,14,0.98),rgba(10,14,18,0.96))] p-8 shadow-[0_24px_60px_rgba(0,0,0,0.34)] md:p-10">
        {eyebrow ? (
          <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-[#7dd9d8]">
            {eyebrow}
          </p>
        ) : null}
        {title ? (
          <h1 className="text-center font-heading text-3xl font-extrabold tracking-[-0.03em] text-white md:text-4xl">
            {title}
          </h1>
        ) : null}
        {description ? (
          <p className="mx-auto mt-3 max-w-3xl text-center text-sm leading-7 text-slate-300">
            {description}
          </p>
        ) : null}
        <div className={title || description ? 'mt-8' : ''}>{children}</div>
      </div>
    </section>
  );
}
