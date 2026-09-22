import { Link } from 'react-router-dom';
import { FOOTER_NAV } from '../../lib/nav';
import { OFFICIAL_LINKS } from '../../data/contacts';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <svg viewBox="0 0 40 40" className="h-10 w-10 shrink-0" aria-hidden>
              <circle cx="20" cy="20" r="19" fill="#fff" />
              <path
                d="M21 7.5c.8 8.4-7.6 11.7-7.6 18.7a7.7 7.7 0 0 0 15.4 0c0-3.7-2.3-5.9-4.1-8.1-.4 2-1.5 3.1-2.9 4-.9-5 2.9-8.7-.8-14.6Z"
                fill="#0079C2"
              />
            </svg>
            <span className="leading-tight">
              <span className="block text-[17px] font-extrabold tracking-[0.08em]">ГАЗПРОМ</span>
              <span className="mt-0.5 block text-xs text-white/60">Калининградская область</span>
            </span>
          </div>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Региональный информационный ресурс о деятельности ПАО «Газпром» и организаций Группы
            в Калининградской области.
          </p>
        </div>

        {Object.values(FOOTER_NAV).map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-white/90">{col.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-white/65 transition-colors hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-wrap gap-x-6 gap-y-2 py-5 text-xs text-white/50">
          {OFFICIAL_LINKS.slice(0, 6).map((l) => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="transition-colors hover:text-white/90">
              {l.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-3 py-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2013–{year} ПАО «Газпром». Все права на материалы сайта защищены.</p>
          <p className="max-w-xl sm:text-right">
            Информационный региональный портал. Материалы подготовлены на основе открытых официальных
            источников, ссылки указаны в разделах сайта.
          </p>
        </div>
      </div>
    </footer>
  );
}
