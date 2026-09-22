import { Link, useParams } from 'react-router-dom';
import { getFacilityBySlug, MAP_OBJECTS } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SmartImage, ImageCredit } from '../components/ui/SmartImage';
import { GazpromMap } from '../components/map/GazpromMap';
import { MapPinIcon } from '../components/ui/icons';

export default function FacilityDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const facility = slug ? getFacilityBySlug(slug) : undefined;

  useSEO({
    title: facility ? `${facility.name} — Объекты` : 'Объект не найден',
    description: facility ? `${facility.location}. ${facility.description[0]}` : 'Объект не найден',
    path: facility ? `/facilities/${facility.slug}` : '/facilities',
    image: facility?.image?.src,
  });

  if (!facility) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold text-graphite">Объект не найден</h1>
        <Link to="/facilities" className="btn-primary mt-6">Все объекты</Link>
      </div>
    );
  }

  const mapObject = MAP_OBJECTS.find((m) => m.facilitySlug === facility.slug || m.link === `/facilities/${facility.slug}`);
  const coords = facility.coords ?? mapObject?.coords;

  return (
    <>
      <Breadcrumbs items={[{ label: 'Объекты', to: '/facilities' }, { label: facility.name }]} />
      <div className="container-page pb-16">
        <article className="mx-auto max-w-4xl">
          <header>
            <span className="text-sm font-semibold uppercase tracking-wide text-gp-600">{facility.type}</span>
            <h1 className="mt-2 text-2xl font-extrabold leading-tight tracking-tight text-graphite sm:text-[34px]">
              {facility.name}
            </h1>
            <p className="mt-3 flex items-start gap-2 text-[15px] text-slate-600">
              <MapPinIcon className="mt-0.5 h-5 w-5 shrink-0 text-gp-600" aria-hidden />
              {facility.location}
              {facility.coordsNote && <span className="text-slate-400">({facility.coordsNote})</span>}
            </p>
            {facility.status && (
              <p className="mt-3 inline-flex rounded-sm bg-gp-50 px-3 py-1 text-sm font-semibold text-gp-800">
                {facility.status}
              </p>
            )}
          </header>

          {facility.image && (
            <figure className="mt-8">
              <SmartImage image={facility.image} className="overflow-hidden rounded-lg" loading="eager" />
              <ImageCredit image={facility.image} />
            </figure>
          )}

          <div className="rich-text mt-8">
            {facility.description.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          {facility.facts && facility.facts.length > 0 && (
            <section className="mt-10" aria-labelledby="facts">
              <h2 id="facts" className="text-xl font-bold text-graphite">Ключевые характеристики</h2>
              <dl className="mt-4 divide-y divide-slate-100 rounded-lg border border-slate-200">
                {facility.facts.map((f) => (
                  <div key={f.label} className="grid gap-1 p-4 sm:grid-cols-[220px_1fr] sm:gap-4">
                    <dt className="text-sm font-semibold text-graphite">{f.label}</dt>
                    <dd className="text-sm leading-relaxed text-slate-600">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {coords && (
            <section className="mt-10" aria-labelledby="onmap">
              <h2 id="onmap" className="mb-4 text-xl font-bold text-graphite">На карте</h2>
              <div className="card overflow-hidden">
                <GazpromMap
                  objects={mapObject ? [mapObject] : []}
                  activeId={mapObject?.id ?? null}
                  fitKey={facility.slug}
                  className="h-[360px]"
                />
              </div>
              <p className="mt-2 text-xs text-slate-400">
                Расположение показано ориентировочно; точные координаты производственных объектов
                не публикуются. Общая карта региона — в разделе{' '}
                <Link to="/map" className="underline hover:text-gp-700">«Карта»</Link>.
              </p>
            </section>
          )}

          {facility.source && (
            <p className="mt-8 text-sm text-slate-500">
              Источник:{' '}
              <a href={facility.source.url} target="_blank" rel="noreferrer" className="text-gp-700 underline decoration-gp-200">
                {facility.source.label}
              </a>
            </p>
          )}
        </article>
      </div>
    </>
  );
}
