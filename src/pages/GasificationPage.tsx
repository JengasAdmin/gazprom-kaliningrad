import { Link } from 'react-router-dom';
import { GASIFICATION } from '../data/gasification';
import { IMAGES } from '../data/images';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SmartImage } from '../components/ui/SmartImage';
import { SectionHeader } from '../components/ui/SectionHeader';
import { ArrowRightIcon, ExternalLinkIcon } from '../components/ui/icons';
import { getNews } from '../data';
import { NewsCard } from '../components/ui/NewsCard';

export default function GasificationPage() {
  const news = getNews().filter((n) => n.category === 'Газификация').slice(0, 3);

  useSEO({
    title: `Газификация — Газпром — Калининградская область`,
    description:
      'Программа газификации Калининградской области: уровень газификации, порядок подключения, социальная догазификация, документы и контакты.',
    path: '/gasification',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Газификация' }]} />

      {/* Шапка раздела */}
      <section className="relative overflow-hidden bg-navy text-white">
        <SmartImage image={IMAGES.welding} className="hero-photo absolute inset-0" imgClassName="opacity-30" />
        <div className="hero-gradient absolute inset-0 bg-gradient-to-r from-navy/95 to-navy/60" aria-hidden />
        <div className="container-page relative py-16 sm:py-20">
          <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">Газификация</h1>
          <div className="mt-5 max-w-3xl space-y-3">
            {GASIFICATION.intro.map((p, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-white/85">{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Показатели */}
      <section className="py-12" aria-label="Ключевые показатели">
        <div className="container-page grid grid-cols-2 gap-4 lg:grid-cols-4">
          {GASIFICATION.facts.map((f) => (
            <div key={f.label} className="card p-5">
              <span className="block text-2xl font-extrabold text-gp-700 sm:text-3xl">{f.value}</span>
              <span className="mt-2 block text-xs leading-relaxed text-slate-500 sm:text-sm">{f.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Программа */}
      <section className="pb-14" aria-labelledby="program">
        <div className="container-page">
          <div className="card grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 id="program" className="text-xl font-bold text-graphite sm:text-2xl">
                {GASIFICATION.program.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {GASIFICATION.program.items.map((t, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-600">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gp-600" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <a href={GASIFICATION.program.source.url} target="_blank" rel="noreferrer" className="link-arrow mt-4">
                {GASIFICATION.program.source.label}
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </a>
            </div>
            <div className="grid content-start gap-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-slate-400">Направления соглашения 2024–2029</h3>
              {['Газификация городов, посёлков и сельских населённых пунктов', 'Стабильные поставки газа в регион', 'Развитие газомоторной отрасли'].map((t) => (
                <p key={t} className="rounded-lg border border-gp-100 bg-gp-50/60 px-4 py-3 text-sm font-medium text-gp-900">
                  {t}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Этапы подключения */}
      <section className="bg-slate-50 py-14" aria-labelledby="steps">
        <div className="container-page">
          <SectionHeader
            id="steps"
            title="Как подключить газ"
            subtitle="Базовый порядок технологического присоединения. Актуальные требования уточняйте в клиентских службах — список документов зависит от категории заявителя."
          />
          <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {GASIFICATION.steps.map((s) => (
              <li key={s.step} className="card relative p-6">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-gp-600 text-sm font-bold text-white">
                  {s.step}
                </span>
                <h3 className="mt-4 text-[16px] font-bold text-graphite">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Документы и сервисы */}
      <section className="py-14" aria-labelledby="docs">
        <div className="container-page">
          <SectionHeader id="docs" title="Полезные документы и сервисы" />
          <ul className="grid gap-3 sm:grid-cols-2">
            {GASIFICATION.documents.map((d) => (
              <li key={d.url}>
                <a
                  href={d.url}
                  target="_blank"
                  rel="noreferrer"
                  className="card-interactive flex items-center justify-between gap-4 p-5"
                >
                  <span className="text-[15px] font-semibold text-graphite">{d.label}</span>
                  <ExternalLinkIcon className="h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Новости газификации */}
      <section className="pb-16" aria-labelledby="gas-news">
        <div className="container-page">
          <SectionHeader id="gas-news" title="Новости газификации" linkTo="/news?category=Газификация" linkLabel="Все материалы" />
          <div className="grid gap-5 md:grid-cols-3">
            {news.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
          <p className="mt-8 text-sm text-slate-600">
            Контакты клиентских центров и аварийных служб — в разделе{' '}
            <Link to="/contacts" className="font-semibold text-gp-700 underline decoration-gp-200">«Контакты»</Link>.
          </p>
        </div>
      </section>
    </>
  );
}
