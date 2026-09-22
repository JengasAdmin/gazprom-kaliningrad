import { getStructure } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { GlobeIcon, MapPinIcon, PhoneIcon, StructureIcon } from '../components/ui/icons';

export default function StructurePage() {
  const nodes = getStructure();
  const root = nodes.find((n) => n.level === 1);
  const second = nodes.filter((n) => n.level === 2);
  const third = nodes.filter((n) => n.level === 3);

  useSEO({
    title: `Структура — Газпром — Калининградская область`,
    description:
      'Организации Группы Газпрома, работающие в Калининградской области: газоснабжение, магистральный транспорт, подземное хранение, газораспределение, газомоторное топливо.',
    path: '/structure',
  });

  const childrenOf = (id: string) => third.filter((t) => t.parentId === id);

  return (
    <>
      <Breadcrumbs items={[{ label: 'Структура' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Структура</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Иерархия организаций, обеспечивающих деятельность Группы Газпрома в Калининградской
            области. Включены только организации, чья принадлежность подтверждена официальными
            источниками — ссылка на источник указана в каждой карточке.
          </p>
        </header>

        {/* Схема */}
        <ol className="mt-10 space-y-4" aria-label="Схема структуры">
          <li className="mx-auto w-fit rounded-lg bg-navy px-6 py-3.5 text-center text-white">
            <span className="block text-sm font-bold">{root?.name}</span>
            <span className="mt-0.5 block text-xs text-white/60">{root?.function}</span>
          </li>
          <li aria-hidden className="text-center text-slate-300">↓</li>
          <li className="mx-auto w-fit rounded-lg border-2 border-gp-600 bg-gp-50 px-6 py-3 text-center">
            <span className="block text-sm font-bold text-gp-800">Региональные структуры Группы</span>
            <span className="mt-0.5 block text-xs text-slate-500">филиалы и общества в Калининградской области</span>
          </li>
          <li aria-hidden className="text-center text-slate-300">↓</li>
          <li className="mx-auto w-fit rounded-lg border border-slate-200 bg-white px-6 py-3 text-center shadow-card">
            <span className="block text-sm font-bold text-graphite">Подразделения и направления</span>
            <span className="mt-0.5 block text-xs text-slate-500">
              газоснабжение · транспорт · хранение · распределение · ГМТ
            </span>
          </li>
        </ol>

        {/* Уровень 2 */}
        <div className="mt-12 space-y-6">
          {second.map((org) => (
            <section key={org.id} className="card p-6" aria-labelledby={`org-${org.id}`}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 id={`org-${org.id}`} className="text-lg font-bold text-graphite">
                    {org.name}
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-gp-700">{org.function}</p>
                </div>
                {org.website && (
                  <a href={org.website} target="_blank" rel="noreferrer" className="btn-outline !px-4 !py-2 text-xs">
                    <GlobeIcon className="h-4 w-4" aria-hidden />
                    Официальный сайт
                  </a>
                )}
              </div>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-slate-600">
                {org.description.join(' ')}
              </p>

              {childrenOf(org.id).length > 0 && (
                <div className="mt-5 space-y-4 border-l-2 border-gp-100 pl-4 sm:pl-6">
                  {childrenOf(org.id).map((child) => (
                    <article key={child.id} className="rounded-lg bg-slate-50 p-5" aria-labelledby={`org-${child.id}`}>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                          <h3 id={`org-${child.id}`} className="text-[16px] font-bold text-graphite">
                            {child.name}
                          </h3>
                          <p className="mt-1 text-sm font-semibold text-gp-700">{child.function}</p>
                        </div>
                        <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                          <StructureIcon className="h-3.5 w-3.5" aria-hidden />
                          принадлежность подтверждена
                        </span>
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-slate-600">{child.description.join(' ')}</p>
                      <dl className="mt-3 space-y-1.5 text-sm text-slate-600">
                        {child.address && (
                          <div className="flex items-start gap-2">
                            <dt className="sr-only">Адрес</dt>
                            <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                            <dd>{child.address}</dd>
                          </div>
                        )}
                        {child.phone && (
                          <div className="flex items-start gap-2">
                            <dt className="sr-only">Телефон</dt>
                            <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                            <dd>
                              <a href={`tel:${child.phone.replace(/[^+\d]/g, '')}`} className="hover:text-gp-700">
                                {child.phone}
                              </a>
                            </dd>
                          </div>
                        )}
                        {child.source && (
                          <div className="pt-1 text-xs text-slate-400">
                            Источник:{' '}
                            <a href={child.source.url} target="_blank" rel="noreferrer" className="underline decoration-slate-300 hover:text-gp-700">
                              {child.source.label}
                            </a>
                          </div>
                        )}
                      </dl>
                    </article>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-400">
          Принадлежность организаций к Группе Газпрома не утверждается без официального источника.
          При обнаружении изменений в структуре данные будут актуализированы.
        </p>
      </div>
    </>
  );
}
