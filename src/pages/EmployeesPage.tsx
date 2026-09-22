import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { EMPLOYEE_ROLES, EMPLOYEE_GROUPS } from '../data/employees';
import type { EmployeeGroupId } from '../data/types';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { PeopleIcon, ArrowRightIcon } from '../components/ui/icons';

export default function EmployeesPage() {
  const [group, setGroup] = useState<EmployeeGroupId | 'all'>('all');

  useSEO({
    title: `Сотрудники — Газпром — Калининградская область`,
    description:
      'Каталог специалистов газовой отрасли Калининградской области: направления работы, функциональные роли, руководство региональных организаций.',
    path: '/employees',
  });

  const roles = useMemo(
    () => (group === 'all' ? EMPLOYEE_ROLES : EMPLOYEE_ROLES.filter((r) => r.group === group)),
    [group],
  );

  return (
    <>
      <Breadcrumbs items={[{ label: 'Сотрудники' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Сотрудники</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Каталог разделён на две части: подтверждённые руководители региональных организаций и
            функциональный каталог специалистов — без персональных данных, только должности и
            зоны ответственности.
          </p>
        </header>

        {/* Руководители */}
        <section className="mt-10 rounded-xl border border-gp-100 bg-gp-50/60 p-6 sm:p-8" aria-labelledby="mgmt-block">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 id="mgmt-block" className="text-xl font-bold text-graphite">Руководители</h2>
              <p className="mt-1 max-w-xl text-sm leading-relaxed text-slate-600">
                Публично подтверждённые руководители организаций Группы Газпрома в регионе —
                с указанием официального источника для каждой должности.
              </p>
            </div>
            <Link to="/management" className="btn-primary">
              Открыть руководство
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </section>

        {/* Специалисты */}
        <section className="mt-12" aria-labelledby="spec-block">
          <h2 id="spec-block" className="text-xl font-bold text-graphite">Специалисты</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            Нейтральные карточки должностей: описание того, за что отвечает специалист.
          </p>

          <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label="Фильтр по категориям специалистов">
            <button
              type="button"
              onClick={() => setGroup('all')}
              aria-pressed={group === 'all'}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                group === 'all' ? 'bg-gp-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-gp-50'
              }`}
            >
              Все
            </button>
            {EMPLOYEE_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                onClick={() => setGroup(g.id)}
                aria-pressed={group === g.id}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  group === g.id ? 'bg-gp-600 text-white' : 'bg-slate-100 text-slate-700 hover:bg-gp-50'
                }`}
              >
                {g.label}
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((r) => (
              <article key={r.id} className="card p-5">
                <span className="grid h-10 w-10 place-items-center rounded-lg bg-gp-50 text-gp-600">
                  <PeopleIcon className="h-5 w-5" aria-hidden />
                </span>
                <h3 className="mt-3 text-[15px] font-bold leading-snug text-graphite">{r.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{r.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
