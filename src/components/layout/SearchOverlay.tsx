import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { search, splitHighlight, KIND_LABELS, type SearchResult } from '../../lib/search';
import { SearchIcon, CloseIcon } from '../ui/icons';

const SUGGESTIONS = ['ПХГ', 'газификация', 'Балтийск', 'соглашение', 'руководство', 'СПГ'];

function Highlighted({ text, query }: { text: string; query: string }) {
  const parts = useMemo(() => splitHighlight(text, query), [text, query]);
  return (
    <>
      {parts.map((p, i) => (p.hit ? <mark key={i} className="bg-gp-100 text-gp-900">{p.text}</mark> : <span key={i}>{p.text}</span>))}
    </>
  );
}

function ResultRow({ r, query }: { r: SearchResult; query: string }) {
  return (
    <Link to={r.to} className="block rounded-lg px-4 py-3 transition-colors hover:bg-gp-50">
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-gp-700">{r.kindLabel}</span>
        {r.date && <time className="text-xs text-slate-400">{r.date}</time>}
      </div>
      <h3 className="mt-0.5 text-[15px] font-semibold leading-snug text-graphite">
        <Highlighted text={r.title} query={query} />
      </h3>
      <p className="mt-1 line-clamp-2 text-sm text-slate-500">
        <Highlighted text={r.snippet} query={query} />
      </p>
    </Link>
  );
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setQuery('');
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => inputRef.current?.focus());
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const results = useMemo(() => search(query), [query]);
  const grouped = useMemo(() => {
    const map = new Map<string, SearchResult[]>();
    for (const r of results) {
      const arr = map.get(r.kind) ?? [];
      arr.push(r);
      map.set(r.kind, arr);
    }
    return map;
  }, [results]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50" role="dialog" aria-modal="true" aria-label="Поиск по сайту">
      <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div className="absolute inset-x-0 top-0 mx-auto max-h-[85vh] w-full max-w-3xl overflow-y-auto bg-white shadow-2xl sm:mt-14 sm:rounded-xl">
        <div className="sticky top-0 border-b border-slate-100 bg-white p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <SearchIcon className="h-5 w-5 shrink-0 text-gp-600" aria-hidden />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && results.length > 0) {
                  navigate('/search', { state: { query } });
                  onClose();
                }
              }}
              placeholder="Новости, объекты, проекты, сотрудники…"
              aria-label="Поисковый запрос"
              className="w-full bg-transparent text-lg text-graphite placeholder:text-slate-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть поиск"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-slate-500 hover:bg-slate-100"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          </div>
          {query.length < 2 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setQuery(s)}
                  className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 hover:bg-gp-50 hover:text-gp-800"
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="p-4 sm:p-5">
          {query.trim().length < 2 ? (
            <p className="px-1 py-6 text-center text-sm text-slate-500">
              Введите не менее двух символов. Поиск ведётся по новостям, объектам, проектам,
              руководству, организациям и каталогу специалистов.
            </p>
          ) : results.length === 0 ? (
            <div className="px-1 py-10 text-center">
              <p className="text-[15px] font-semibold text-graphite">По запросу «{query}» ничего не найдено</p>
              <p className="mt-2 text-sm text-slate-500">
                Попробуйте изменить формулировку или поискать по категории — например, «газификация» или «ПХГ».
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              <p className="text-xs text-slate-400">
                Найдено материалов: {results.length}.{' '}
                <Link
                  to="/search"
                  state={{ query }}
                  onClick={onClose}
                  className="font-semibold text-gp-700 underline decoration-gp-200"
                >
                  Открыть страницу поиска
                </Link>
              </p>
              {[...grouped.entries()].map(([kind, items]) => (
                <section key={kind}>
                  <h2 className="mb-1 px-4 text-xs font-bold uppercase tracking-wide text-slate-400">
                    {KIND_LABELS[kind as SearchResult['kind']]}
                  </h2>
                  <div className="space-y-0.5">
                    {items.slice(0, 4).map((r) => (
                      <ResultRow key={r.id} r={r} query={query} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
