import { Link } from 'react-router-dom';
import { ArrowRightIcon } from './icons';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  linkTo?: string;
  linkLabel?: string;
  id?: string;
}

export function SectionHeader({ title, subtitle, linkTo, linkLabel = 'Все материалы', id }: SectionHeaderProps) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 id={id} className="text-2xl font-bold tracking-tight text-graphite sm:text-3xl">
          {title}
        </h2>
        {subtitle && <p className="mt-2 max-w-2xl text-[15px] leading-relaxed text-slate-600">{subtitle}</p>}
      </div>
      {linkTo && (
        <Link to={linkTo} className="link-arrow group shrink-0">
          {linkLabel}
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
