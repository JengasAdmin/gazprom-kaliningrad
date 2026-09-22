import { Link } from 'react-router-dom';
import type { NewsItem } from '../../data/types';
import { formatDate } from '../../data';
import { SmartImage } from './SmartImage';
import { ArrowRightIcon } from './icons';

export function CategoryBadge({ children, dark = false }: { children: string; dark?: boolean }) {
  return (
    <span
      className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${
        dark ? 'bg-gp-600 text-white' : 'bg-gp-50 text-gp-800'
      }`}
    >
      {children}
    </span>
  );
}

/** Большая карточка главной новости (блок «Главное»). */
export function FeaturedNews({ item }: { item: NewsItem }) {
  return (
    <Link
      to={`/news/${item.slug}`}
      className="card-interactive group relative flex min-h-[320px] flex-col justify-end overflow-hidden sm:min-h-[420px]"
    >
      {item.image && (
        <SmartImage
          image={item.image}
          className="absolute inset-0"
          imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/70 to-navy/10" aria-hidden />
      <div className="relative z-10 p-6 sm:p-8">
        <div className="mb-3 flex items-center gap-3">
          <CategoryBadge dark>{item.category}</CategoryBadge>
          <span className="text-xs font-medium text-white/80">{formatDate(item.date)}</span>
        </div>
        <h3 className="max-w-3xl text-xl font-bold leading-snug text-white sm:text-2xl lg:text-[28px]">
          {item.title}
        </h3>
        <p className="mt-3 hidden max-w-2xl text-sm leading-relaxed text-white/85 sm:block">{item.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-gp-200">
          Подробнее
          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Стандартная карточка новости в сетке. */
export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <Link to={`/news/${item.slug}`} className="card-interactive group flex flex-col overflow-hidden">
      {item.image && (
        <div className="aspect-[16/10] overflow-hidden">
          <SmartImage
            image={item.image}
            className="h-full"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2.5 flex items-center gap-3">
          <CategoryBadge>{item.category}</CategoryBadge>
          <span className="text-xs text-slate-400">{formatDate(item.date)}</span>
        </div>
        <h3 className="text-[16px] font-semibold leading-snug text-graphite transition-colors group-hover:text-gp-700">
          {item.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{item.excerpt}</p>
      </div>
    </Link>
  );
}

/** Компактная строка новости для боковых списков. */
export function NewsRow({ item }: { item: NewsItem }) {
  return (
    <Link to={`/news/${item.slug}`} className="group flex items-start gap-4 py-4">
      <div className="w-1 self-stretch bg-gp-100" aria-hidden />
      <div>
        <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
          <span className="font-semibold text-gp-700">{item.category}</span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
        <h3 className="text-[15px] font-semibold leading-snug text-graphite transition-colors group-hover:text-gp-700">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}
