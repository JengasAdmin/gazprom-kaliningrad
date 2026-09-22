import { Link, useParams } from 'react-router-dom';
import { formatDate, getNewsBySlug, getRelatedNews } from '../data';
import { useSEO, newsJsonLd } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SmartImage, ImageCredit } from '../components/ui/SmartImage';
import { NewsRow } from '../components/ui/NewsCard';
import { NewsCard } from '../components/ui/NewsCard';
import { CategoryBadge } from '../components/ui/NewsCard';

export default function NewsDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? getNewsBySlug(slug) : undefined;

  useSEO({
    title: item ? `${item.title} — Новости` : 'Новость не найдена',
    description: item?.excerpt ?? 'Новость не найдена',
    path: item ? `/news/${item.slug}` : '/news',
    type: 'article',
    image: item?.image?.src,
    jsonLd: item ? newsJsonLd({
      title: item.title,
      description: item.excerpt,
      datePublished: item.date,
      path: `/news/${item.slug}`,
      image: item.image?.src,
    }) : undefined,
  });

  if (!item) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-graphite">Новость не найдена</h1>
        <p className="mt-3 text-slate-600">Возможно, материал был перемещён или ещё не опубликован.</p>
        <Link to="/news" className="btn-primary mt-6">Все новости</Link>
      </div>
    );
  }

  const related = getRelatedNews(item.slug, 3);
  const project = item.projectSlug;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Новости', to: '/news' }, { label: item.title }]} />
      <article className="container-page pb-16">
        <div className="mx-auto max-w-3xl">
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <CategoryBadge dark>{item.category}</CategoryBadge>
              <time dateTime={item.date} className="text-sm text-slate-500">
                {formatDate(item.date)}
              </time>
            </div>
            <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-graphite sm:text-[34px]">
              {item.title}
            </h1>
            <p className="mt-4 border-l-4 border-gp-600 pl-4 text-[17px] leading-relaxed text-slate-600">
              {item.excerpt}
            </p>
          </header>

          {item.image && (
            <figure className="mt-8">
              <SmartImage image={item.image} className="overflow-hidden rounded-lg" loading="eager" />
              <ImageCredit image={item.image} />
            </figure>
          )}

          <div className="rich-text mt-8">
            {item.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {item.source && (
            <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
              <span className="font-semibold text-graphite">Источник: </span>
              <a href={item.source.url} target="_blank" rel="noreferrer" className="text-gp-700 underline decoration-gp-200 hover:text-gp-600">
                {item.source.label}
              </a>
            </div>
          )}
        </div>
      </article>

      <div className="bg-slate-50 py-14">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
            <section aria-labelledby="related">
              <h2 id="related" className="mb-6 text-xl font-bold text-graphite">
                Другие новости региона
              </h2>
              <div className="grid gap-5 sm:grid-cols-2">
                {related.slice(0, 2).map((n) => (
                  <NewsCard key={n.id} item={n} />
                ))}
              </div>
            </section>
            <aside>
              <h2 className="mb-2 text-xl font-bold text-graphite">Последние материалы</h2>
              <div className="divide-y divide-slate-100">
                {related.map((n) => (
                  <NewsRow key={n.id} item={n} />
                ))}
              </div>
              {project && (
                <Link to={`/projects/${project}`} className="btn-outline mt-6 w-full justify-center">
                  Связанный проект
                </Link>
              )}
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
