import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { MAP_OBJECTS } from '../data';
import type { MapCategory } from '../data/types';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { GazpromMap, CATEGORY_META } from '../components/map/GazpromMap';

const FILTERS: (MapCategory | 'all')[] = ['all', 'storage', 'pipeline', 'gasification', 'admin', 'social'];

export default function MapPage() {
  const [filter, setFilter] = useState<MapCategory | 'all'>('all');
  const [activeId, setActiveId] = useState<string | null>(null);

  useSEO({
    title: `Карта объектов — Газпром — Калининградская область`,
    description:
      'Интерактивная карта объектов Группы Газпрома в Калининградской области: газохранилища, газопроводы и ГРС, АГНКС, офисы и социальные объекты.',
    path: '/map',
  });

  const objects = useMemo(
    () => (filter === 'all' ? MAP_OBJECTS : MAP_OBJECTS.filter((o) => o.mapCategory === filter)),
    [filter],
  );
  const active = objects.find((o) => o.id === activeId) ?? objects[0];

  return (
    <>
      <Breadcrumbs items={[{ label: 'Карта объектов' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">
            Газпром на карте Калининградской области
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Интерактивная карта объектов Группы Газпрома в регионе. Координаты производственных
            объектов показаны ориентировочно — точное расположение критической инфраструктуры
            не публикуется.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Фильтр объектов по категориям">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => {
                setFilter(f);
                setActiveId(null);
              }}
              aria-pressed={filter === f}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === f ? 'bg-gp-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-gp-50'
              }`}
            >
              {f === 'all' ? 'Все' : CATEGORY_META[f].label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-[360px_1fr]">
          {/* Список объектов */}
          <div className="order-2 lg:order-1">
            <div className="max-h-[620px] space-y-2 overflow-y-auto pr-1" aria-label="Список объектов">
              {objects.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setActiveId(o.id)}
                  className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                    active?.id === o.id
                      ? 'border-gp-600 bg-gp-50'
                      : 'border-slate-200 bg-white hover:border-gp-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: CATEGORY_META[o.mapCategory].color }}
                      aria-hidden
                    />
                    <span className="text-sm font-semibold text-graphite">{o.name}</span>
                  </span>
                  <span className="mt-1 block text-xs leading-relaxed text-slate-500">{o.short}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Карта */}
          <div className="order-1 lg:order-2">
            <div className="card overflow-hidden">
              <GazpromMap
                objects={objects}
                activeId={active?.id ?? null}
                onActiveChange={setActiveId}
                fitKey={filter}
                className="h-[420px] sm:h-[620px]"
              />
            </div>

            {/* Карточка выбранного объекта */}
            {active && (
              <aside className="card mt-4 p-5" aria-live="polite">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <span
                      className="inline-block rounded-sm px-2 py-0.5 text-xs font-semibold text-white"
                      style={{ backgroundColor: CATEGORY_META[active.mapCategory].color }}
                    >
                      {CATEGORY_META[active.mapCategory].label}
                    </span>
                    <h2 className="mt-2 text-lg font-bold text-graphite">{active.name}</h2>
                    <p className="mt-1 max-w-2xl text-sm leading-relaxed text-slate-600">{active.short}</p>
                  </div>
                  {active.facilitySlug && (
                    <Link to={`/facilities/${active.facilitySlug}`} className="btn-outline !px-4 !py-2 text-xs">
                      Страница объекта
                    </Link>
                  )}
                  {active.link && (
                    <Link to={active.link} className="btn-outline !px-4 !py-2 text-xs">
                      Подробнее
                    </Link>
                  )}
                </div>
              </aside>
            )}
          </div>
        </div>

        <p className="mt-6 text-xs text-slate-400">
          Карта: OpenStreetMap. Категории: газохранилища (ПХГ, СПГ-терминал), газопроводы и ГРС,
          объекты газификации и газомоторного топлива, административные и социальные объекты.
        </p>
      </div>
    </>
  );
}
