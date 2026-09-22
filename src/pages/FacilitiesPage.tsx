import { useMemo, useState } from 'react';
import { getFacilities, FACILITIES } from '../data';
import { FACILITY_TYPE_LABELS } from '../data/facilities';
import type { FacilityType } from '../data/types';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FacilityCard } from '../components/ui/FacilityCard';

export default function FacilitiesPage() {
  const [type, setType] = useState<FacilityType | 'all'>('all');

  useSEO({
    title: `Объекты — Газпром — Калининградская область`,
    description:
      'Каталог объектов газовой инфраструктуры Калининградской области: подземное хранилище газа, магистральный газопровод, ГРС, АГНКС, терминал СПГ.',
    path: '/facilities',
  });

  const types = useMemo(
    () => Array.from(new Set(FACILITIES.map((f) => f.type))) as FacilityType[],
    [],
  );
  const list = useMemo(
    () => (type === 'all' ? getFacilities() : getFacilities().filter((f) => f.type === type)),
    [type],
  );

  return (
    <>
      <Breadcrumbs items={[{ label: 'Объекты' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Объекты</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Производственная и социальная инфраструктура Группы Газпрома в Калининградской области.
            Особое место в системе региона занимает Калининградское подземное хранилище газа.
          </p>
        </header>

        <div className="mt-8 flex flex-wrap gap-2" role="group" aria-label="Фильтр по типам объектов">
          <button
            type="button"
            onClick={() => setType('all')}
            aria-pressed={type === 'all'}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              type === 'all' ? 'bg-gp-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-gp-50'
            }`}
          >
            Все
          </button>
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              aria-pressed={type === t}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                type === t ? 'bg-gp-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-gp-50'
              }`}
            >
              {FACILITY_TYPE_LABELS[t]}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((f) => (
            <FacilityCard key={f.id} facility={f} />
          ))}
        </div>
      </div>
    </>
  );
}
