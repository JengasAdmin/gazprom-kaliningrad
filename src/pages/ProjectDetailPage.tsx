import { Link, useParams } from 'react-router-dom';
import { getProjectBySlug, getNews } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SmartImage, ImageCredit } from '../components/ui/SmartImage';
import { NewsCard } from '../components/ui/NewsCard';
import { MapPinIcon, ArrowRightIcon } from '../components/ui/icons';

const STATUS_STYLE: Record<string, string> = {
  'Реализуется': 'bg-emerald-50 text-emerald-700',
  'Завершён': 'bg-slate-100 text-slate-600',
  'Подготовка': 'bg-amber-50 text-amber-700',
};

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;

  useSEO({
    title: project ? `${project.name} — Проекты` : 'Проект не найден',
    description: project?.description[0] ?? 'Проект не найден',
    path: project ? `/projects/${project.slug}` : '/projects',
    image: project?.image?.src,
  });

  if (!project) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-graphite">Проект не найден</h1>
        <Link to="/projects" className="btn-primary mt-6">Все проекты</Link>
      </div>
    );
  }

  const relatedNews = (project.relatedNewsSlugs ?? [])
    .map((s) => getNews().find((n) => n.slug === s))
    .filter(Boolean);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Проекты', to: '/projects' }, { label: project.name }]} />
      <article className="container-page pb-16">
        <div className="mx-auto max-w-4xl">
          <header>
            <div className="flex flex-wrap items-center gap-3">
              <span className={`rounded-sm px-2.5 py-1 text-sm font-semibold ${STATUS_STYLE[project.status]}`}>
                {project.status}
              </span>
              {project.period && <span className="text-sm text-slate-500">{project.period}</span>}
            </div>
            <h1 className="mt-4 text-2xl font-extrabold leading-tight tracking-tight text-graphite sm:text-[34px]">
              {project.name}
            </h1>
            <p className="mt-3 flex items-start gap-2 text-[15px] text-slate-600">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gp-600" aria-hidden />
              {project.territory}
            </p>
          </header>

          {project.image && (
            <figure className="mt-8">
              <SmartImage image={project.image} className="overflow-hidden rounded-lg" loading="eager" />
              <ImageCredit image={project.image} />
            </figure>
          )}

          <div className="rich-text mt-8">
            {project.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {project.source && (
            <p className="mt-8 text-sm text-slate-500">
              Источник:{' '}
              <a href={project.source.url} target="_blank" rel="noreferrer" className="text-gp-700 underline decoration-gp-200">
                {project.source.label}
              </a>
            </p>
          )}
        </div>
      </article>

      {relatedNews.length > 0 && (
        <section className="bg-slate-50 py-14" aria-labelledby="prj-news">
          <div className="container-page">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
              <h2 id="prj-news" className="text-xl font-bold text-graphite">Связанные новости</h2>
              <Link to="/news" className="link-arrow">
                Все новости
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedNews.map((n) => (
                <NewsCard key={n!.id} item={n!} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
