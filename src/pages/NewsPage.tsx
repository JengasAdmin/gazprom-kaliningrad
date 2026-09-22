import { useMemo, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getNews, NEWS_CATEGORIES } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { NewsCard } from '../components/ui/NewsCard';
import { NewsFilters } from '../components/ui/NewsFilters';
import { SearchIcon } from '../components/ui/icons';

const PAGE_SIZE = 6;

export default function NewsPage() {
  const [params, setParams] = useSearchParams();
  const category = params.get('category') ?? 'Все';
  const query = params.get('q') ?? '';
  const sort = (params.get('sort') as 'desc' | 'asc') ?? 'desc';
  const [visible, setVisible] = useState(PAGE_SIZE);

  useSEO({
    title: `Новости — Газпром — Калининградская область`,
    description:
      'Новостная лента о деятельности ПАО «Газпром» в Калининградской области: газификация, производство, инфраструктура, социальные проекты, экология.',
    path: '/news',
  });

  useEffect(() => setVisible(PAGE_SIZE), [category, query, sort]);

  const news = useMemo(() => {
    let list = getNews();
    if (category !== 'Все') list = list.filter((n) => n.category === category);
    const q = query.trim().toLowerCase();
    if (q.length >= 2) {
      list = list.filter(
        (n) => n.title.toLowerCase().includes(q) || n.excerpt.toLowerCase().includes(q),
      );
    }
    return sort === 'desc' ? list : [...list].reverse();
  }, [category, query, sort]);

  const shown = news.slice(0, visible);

  const update = (patch: Record<string, string>) => {
    const next = new URLSearchParams(params);
    for (const [k, v] of Object.entries(patch)) {
      if (v) next.set(k, v);
      else next.delete(k);
    }
    setParams(next, { replace: true });
  };

  return (
    <>
      <Breadcrumbs items={[{ label: 'Новости' }]} />
      <div className="container-page pb-16">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Новости</h1>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-slate-600">
            Официальная лента региона: материалы основаны на пресс-релизах ПАО «Газпром»,
            организаций Группы и правительства Калининградской области — с указанием первоисточника.
          </p>
        </header>

        <NewsFilters
          category={category}
          onCategory={(c) => update({ category: c === 'Все' ? '' : c })}
          query={query}
          onQuery={(q) => update({ q })}
          sort={sort}
          onSort={(s) => update({ sort: s === 'desc' ? '' : s })}
        />

        {shown.length === 0 ? (
          <div className="card grid place-items-center px-6 py-16 text-center">
            <SearchIcon className="h-8 w-8 text-slate-300" aria-hidden />
            <p className="mt-4 text-[15px] font-semibold text-graphite">Материалы не найдены</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Попробуйте изменить категорию или поисковый запрос.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
            {shown.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        )}

        {visible < news.length && (
          <div className="mt-10 text-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE_SIZE)} className="btn-outline px-8">
              Показать ещё
              <span className="text-xs font-normal text-slate-500">
                ({news.length - visible} из {news.length})
              </span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export { NEWS_CATEGORIES };
