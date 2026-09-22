import { NEWS_CATEGORIES } from '../../data';

interface NewsFiltersProps {
  category: string;
  onCategory: (c: string) => void;
  query: string;
  onQuery: (q: string) => void;
  sort: 'desc' | 'asc';
  onSort: (s: 'desc' | 'asc') => void;
}

export function NewsFilters({ category, onCategory, query, onQuery, sort, onSort }: NewsFiltersProps) {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Фильтр по категориям">
        {NEWS_CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => onCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? 'bg-gp-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-gp-50 hover:text-gp-800'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1 sm:max-w-sm">
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Поиск по новостям"
            aria-label="Поиск по новостям"
            className="w-full rounded-md border border-slate-200 bg-white px-4 py-2 pr-4 text-sm text-graphite placeholder:text-slate-400 focus:border-gp-600 focus:outline-none focus:ring-1 focus:ring-gp-600"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-slate-600">
          <span className="sr-only sm:not-sr-only">Сортировка</span>
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as 'desc' | 'asc')}
            className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-graphite focus:border-gp-600 focus:outline-none focus:ring-1 focus:ring-gp-600"
            aria-label="Сортировка новостей по дате"
          >
            <option value="desc">Сначала новые</option>
            <option value="asc">Сначала старые</option>
          </select>
        </label>
      </div>
    </div>
  );
}
