import { Link } from 'react-router-dom';
import { ChevronRightIcon } from './icons';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="py-4 text-sm text-slate-500">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        <li>
          <Link to="/" className="hover:text-gp-700">
            Главная
          </Link>
        </li>
        {items.map((c, i) => (
          <li key={i} className="flex items-center gap-x-1.5">
            <ChevronRightIcon className="h-3.5 w-3.5 text-slate-300" aria-hidden />
            {c.to ? (
              <Link to={c.to} className="hover:text-gp-700">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-graphite">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
