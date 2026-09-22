import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { NAV } from '../../lib/nav';
import { useA11yMode } from '../../lib/useA11yMode';
import { ChevronDownIcon, EyeIcon, SearchIcon } from '../ui/icons';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Газпром — Калининградская область, на главную">
      <svg viewBox="0 0 40 40" className="h-9 w-9 shrink-0" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="#0079C2" />
        <path
          d="M21 7.5c.8 8.4-7.6 11.7-7.6 18.7a7.7 7.7 0 0 0 15.4 0c0-3.7-2.3-5.9-4.1-8.1-.4 2-1.5 3.1-2.9 4-.9-5 2.9-8.7-.8-14.6Z"
          fill="#fff"
        />
      </svg>
      <span className="leading-none">
        <span className="block text-[19px] font-extrabold tracking-[0.08em] text-navy">ГАЗПРОМ</span>
        <span className="mt-1 block text-[12px] font-medium tracking-wide text-slate-500">
          Калининградская область
        </span>
      </span>
    </Link>
  );
}

function NavDropdown({ item }: { item: (typeof NAV)[number] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div ref={ref} className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        onBlur={(e) => {
          if (!ref.current?.contains(e.relatedTarget as Node)) setOpen(false);
        }}
        className="flex items-center gap-1 py-2 text-[14px] font-medium text-graphite transition-colors hover:text-gp-600"
      >
        {item.label}
        <ChevronDownIcon className={`h-4 w-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} aria-hidden />
      </button>
      <div
        className={`absolute left-0 top-full z-50 w-64 pt-2 transition-all duration-150 ${
          open ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-1 opacity-0'
        }`}
      >
        <ul className="card overflow-hidden p-1.5 shadow-cardHover">
          {item.children?.map((c) => (
            <li key={c.to}>
              <NavLink
                to={c.to}
                className="block rounded-md px-3 py-2.5 transition-colors hover:bg-gp-50"
              >
                <span className="block text-sm font-semibold text-graphite">{c.label}</span>
                {c.note && <span className="mt-0.5 block text-xs text-slate-500">{c.note}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface HeaderProps {
  onSearchOpen: () => void;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const { enabled, toggle } = useA11yMode();
  const [menuOpen, setMenuOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const location = useLocation();

  useEffect(() => setMenuOpen(false), [location.pathname, location.search]);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40">
      {/* Служебная строка */}
      <div className="bg-navy text-white">
        <div className="container-page flex h-9 items-center justify-between gap-4 text-xs">
          <a
            href="https://www.gazprom.ru"
            target="_blank"
            rel="noreferrer"
            className="hidden text-white/75 transition-colors hover:text-white sm:block"
          >
            Корпоративный сайт ПАО «Газпром»
          </a>
          <div className="ml-auto flex items-center gap-4">
            <button
              type="button"
              onClick={toggle}
              aria-pressed={enabled}
              className="inline-flex items-center gap-1.5 text-white/80 transition-colors hover:text-white"
            >
              <EyeIcon className="h-4 w-4" aria-hidden />
              Версия для слабовидящих
            </button>
          </div>
        </div>
      </div>

      {/* Основная строка */}
      <div
        className={`border-b border-slate-100 bg-white/95 backdrop-blur transition-shadow ${
          compact ? 'shadow-card' : ''
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between gap-6 lg:h-[72px]">
          <Logo />

          <nav aria-label="Основная навигация" className="hidden xl:block">
            <ul className="flex items-center gap-6">
              {NAV.map((item) =>
                item.children ? (
                  <li key={item.label}>
                    <NavDropdown item={item} />
                  </li>
                ) : (
                  <li key={item.label}>
                    <NavLink
                      to={item.to!}
                      className={({ isActive }) =>
                        `border-b-2 py-2 text-[14px] font-medium transition-colors ${
                          isActive
                            ? 'border-gp-600 text-gp-700'
                            : 'border-transparent text-graphite hover:text-gp-600'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSearchOpen}
              aria-label="Поиск по сайту"
              className="grid h-10 w-10 place-items-center rounded-full text-slate-600 transition-colors hover:bg-gp-50 hover:text-gp-700"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Открыть меню"
              aria-expanded={menuOpen}
              className="grid h-10 w-10 place-items-center rounded-full text-slate-600 transition-colors hover:bg-gp-50 hover:text-gp-700 xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Мобильное меню */}
      {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} onSearchOpen={onSearchOpen} />}
    </header>
  );
}

function MobileMenu({ onClose, onSearchOpen }: { onClose: () => void; onSearchOpen: () => void }) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const location = useLocation();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  // Закрываем только при реальной смене маршрута; сравнение с предыдущим путём
  // устойчиво к двойному вызову эффектов в StrictMode и к нестабильному onClose
  const prevPath = useRef(location.pathname);
  useEffect(() => {
    if (prevPath.current !== location.pathname) {
      prevPath.current = location.pathname;
      onCloseRef.current();
    }
  }, [location.pathname]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onCloseRef.current();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true" aria-label="Меню">
      <div className="absolute inset-0 bg-navy/40" onClick={onClose} aria-hidden />
      <div className="absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <Logo />
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть меню"
            className="grid h-10 w-10 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Мобильная навигация" className="flex-1 overflow-y-auto px-2 py-3">
          <ul>
            {NAV.map((item) =>
              item.children ? (
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => setExpanded(expanded === item.label ? null : item.label)}
                    aria-expanded={expanded === item.label}
                    className="flex w-full items-center justify-between rounded-md px-3 py-3 text-left text-[15px] font-semibold text-graphite hover:bg-gp-50"
                  >
                    {item.label}
                    <ChevronDownIcon
                      className={`h-4 w-4 text-slate-400 transition-transform ${expanded === item.label ? 'rotate-180' : ''}`}
                      aria-hidden
                    />
                  </button>
                  {expanded === item.label && (
                    <ul className="ml-3 border-l border-slate-100 pl-2">
                      {item.children.map((c) => (
                        <li key={c.to}>
                          <Link to={c.to} className="block rounded-md px-3 py-2.5 text-sm text-slate-700 hover:bg-gp-50">
                            {c.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    to={item.to!}
                    className="block rounded-md px-3 py-3 text-[15px] font-semibold text-graphite hover:bg-gp-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={() => {
              onClose();
              onSearchOpen();
            }}
            className="btn-outline w-full justify-center"
          >
            <SearchIcon className="h-4 w-4" aria-hidden />
            Поиск по сайту
          </button>
        </div>
      </div>
    </div>
  );
}
