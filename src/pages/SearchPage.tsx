import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { search, KIND_LABELS, splitHighlight, type SearchResult } from '../lib/search';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SearchIcon } from '../components/ui/icons';
import { Link } from 'react-router-dom';

function Highlighted({ text, query }: { text: string; query: string }) {
  const parts = useMemo(() => splitHighlight(text, query), [text, query]);
  return (
    <>
      {parts.map((p, i) =>
        p.hit ? <mark key={i} className="bg-gp-100 text-gp-900">{p.text}</mark> : <span key={i}>{p.text}</span>,
      )}
    </>
  );
}

export default function SearchPage() {
  const location = useLocation();
  const initial = (location.state as { query?: string } | null)?.query ?? '';
  const [query, setQuery] = useState(initial);

  useSEO({
    title: 'Поиск — Газпром — Калининградская область',
    description: 'Поиск по новостям, объектам, проектам, руководству и каталогу специалистов.',
    path: '/search',
  });

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

  return (
    <>
      <Breadcrumbs items={[{ label: 'Поиск' }]} />
      <div className="container-page pb-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Поиск по сайту</h1>

        <div className="relative mt-6 max-w-2xl">
          <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gp-600" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Новости, объекты, проекты, сотрудники…"
            aria-label="Поисковый запрос"
            className="w-full rounded-lg border border-slate-200 bg-white py-3 pl-12 pr-4 text-[15px] text-graphite placeholder:text-slate-400 focus:border-gp-600 focus:outline-none focus:ring-1 focus:ring-gp-600"
            autoFocus
          />
        </div>

        <div className="mt-8">
          {query.trim().length < 2 ? (
            <p className="text-[15px] text-slate-500">
              Введите не менее двух символов. Поиск ведётся по новостям, объектам, проектам,
              руководству, организациям и каталогу специалистов.
            </p>
          ) : results.length === 0 ? (
            <div className="card grid place-items-center px-6 py-16 text-center">
              <SearchIcon className="h-8 w-8 text-slate-300" aria-hidden />
              <p className="mt-4 text-[15px] font-semibold text-graphite">
                По запросу «{query}» ничего не найдено
              </p>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Попробуйте изменить формулировку — например, «газификация», «ПХГ» или «Балтийск».
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <p className="text-sm text-slate-500">Найдено материалов: {results.length}</p>
              {[...grouped.entries()].map(([kind, items]) => (
                <section key={kind} aria-labelledby={`search-${kind}`}>
                  <h2 id={`search-${kind}`} className="mb-3 text-sm font-bold uppercase tracking-wide text-slate-400">
                    {KIND_LABELS[kind as SearchResult['kind']]} · {items.length}
                  </h2>
                  <div className="space-y-3">
                    {items.map((r) => (
                      <Link key={r.id} to={r.to} className="card-interactive block p-5">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="text-xs font-bold uppercase tracking-wide text-gp-600">{r.kindLabel}</span>
                          {r.date && <time className="text-xs text-slate-400">{r.date}</time>}
                        </div>
                        <h3 className="mt-1 text-[16px] font-semibold leading-snug text-graphite">
                          <Highlighted text={r.title} query={query} />
                        </h3>
                        <p className="mt-1.5 line-clamp-2 text-sm leading-relaxed text-slate-500">
                          <Highlighted text={r.snippet} query={query} />
                        </p>
                      </Link>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
