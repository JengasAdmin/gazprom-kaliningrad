import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { getNews, getMapObjects, formatDate, MAP_OBJECTS } from '../data';
import { IMAGES } from '../data/images';
import { useSEO, organizationJsonLd } from '../lib/seo';
import { SmartImage } from '../components/ui/SmartImage';
import { SectionHeader } from '../components/ui/SectionHeader';
import { FeaturedNews, NewsCard } from '../components/ui/NewsCard';
import { GazpromMap } from '../components/map/GazpromMap';
import {
  GasificationIcon,
  PipeIcon,
  StorageIcon,
  LeafIcon,
  MapPinIcon,
  ArrowRightIcon,
  FlameIcon,
  PeopleIcon,
} from '../components/ui/icons';

const DIRECTIONS = [
  {
    icon: GasificationIcon,
    title: 'Газификация',
    text: 'Программа развития газоснабжения и газификации региона, социальная догазификация, порядок подключения.',
    to: '/gasification',
  },
  {
    icon: FlameIcon,
    title: 'Газоснабжение',
    text: 'Поставки газа потребителям, клиентские центры и пункты приёма документов в районах области.',
    to: '/structure',
  },
  {
    icon: StorageIcon,
    title: 'Подземное хранение газа',
    text: 'Калининградское ПХГ — первое в системе Газпрома хранилище в соляных кавернах. Резерв растёт к 800 млн м³.',
    to: '/facilities/kaliningradskoe-pkhg',
  },
  {
    icon: PipeIcon,
    title: 'Инфраструктура',
    text: 'Магистральный газопровод «Минск — Вильнюс — Каунас — Калининград», ГРС, терминал СПГ.',
    to: '/facilities',
  },
  {
    icon: MapPinIcon,
    title: 'Проекты',
    text: 'Крупные региональные проекты — от энергетического комплекса области до газификации Балтийска.',
    to: '/projects',
  },
  {
    icon: LeafIcon,
    title: 'Социальная деятельность',
    text: 'Программа «Газпром — детям», экологические акции и поддержка региона.',
    to: '/social',
  },
];

export default function HomePage() {
  useSEO({
    title: 'Газпром — Калининградская область',
    description:
      'Деятельность, проекты и инфраструктура ПАО «Газпром» в Калининградской области: новости, газификация, объекты, подземное хранилище газа, карта, контакты.',
    path: '/',
    jsonLd: organizationJsonLd(),
  });

  const news = useMemo(() => getNews(), []);
  const featured = news.find((n) => n.important) ?? news[0];
  const secondary = news.filter((n) => n.id !== featured.id).slice(0, 4);
  const regionNews = news.filter((n) => n.scope === 'region').slice(0, 3);
  const mapObjects = useMemo(() => MAP_OBJECTS.filter((o) => ['storage', 'pipeline'].includes(o.mapCategory)), []);
  const [mapActive, setMapActive] = useState<string | null>(mapObjects[0]?.id ?? null);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy text-white">
        <SmartImage
          image={IMAGES.heroPipeline}
          loading="eager"
          className="hero-photo absolute inset-0"
          imgClassName="opacity-70"
        />
        <div className="hero-gradient absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/30" aria-hidden />
        <div className="container-page relative flex min-h-[440px] flex-col justify-center py-20 sm:min-h-[520px] lg:min-h-[560px]">
          <p className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gp-200">
            <FlameIcon className="h-4 w-4" aria-hidden />
            ПАО «Газпром» в регионе
          </p>
          <h1 className="max-w-3xl text-[34px] font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[56px]">
            Газпром —<br className="hidden sm:block" /> Калининградская область
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/85 sm:text-lg">
            Деятельность, проекты и инфраструктура ПАО «Газпром» в регионе: газоснабжение эксклавной
            области, подземное хранилище газа, газификация населённых пунктов.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/news" className="btn-primary">
              Новости региона
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/facilities" className="btn-ghost-light">
              Объекты Газпрома
            </Link>
          </div>
        </div>
      </section>

      {/* ГЛАВНОЕ */}
      <section className="py-14 sm:py-16" aria-labelledby="main-news">
        <div className="container-page">
          <SectionHeader id="main-news" title="Главное" linkTo="/news" linkLabel="Все новости" />
          <div className="grid gap-5 lg:grid-cols-2">
            <FeaturedNews item={featured} />
            <div className="grid gap-5 sm:grid-cols-2">
              {secondary.map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* НАПРАВЛЕНИЯ */}
      <section className="bg-slate-50 py-14 sm:py-16" aria-labelledby="directions">
        <div className="container-page">
          <SectionHeader
            id="directions"
            title="Газпром в Калининградской области"
            subtitle="Ключевые направления деятельности организаций Группы Газпрома в регионе."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {DIRECTIONS.map((d) => (
              <Link key={d.title} to={d.to} className="card-interactive group flex flex-col p-6">
                <span className="grid h-12 w-12 place-items-center rounded-lg bg-gp-50 text-gp-600 transition-colors group-hover:bg-gp-600 group-hover:text-white">
                  <d.icon className="h-6 w-6" aria-hidden />
                </span>
                <h3 className="mt-4 text-[17px] font-bold text-graphite transition-colors group-hover:text-gp-700">
                  {d.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{d.text}</p>
                <span className="mt-auto pt-4 text-sm font-semibold text-gp-700 inline-flex items-center gap-1.5">
                  Подробнее
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* КАРТА */}
      <section className="py-14 sm:py-16" aria-labelledby="map-section">
        <div className="container-page">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeader
                id="map-section"
                title="Газпром на карте Калининградской области"
                subtitle="Хранилища газа, магистральные газопроводы, ГРС, станции газомоторного топлива, офисы и социальные объекты — с фильтрами по категориям."
              />
              <ul className="mb-6 space-y-3">
                {mapObjects.slice(0, 5).map((o) => (
                  <li key={o.id}>
                    <button
                      type="button"
                      onClick={() => setMapActive(o.id)}
                      className={`w-full rounded-lg border px-4 py-3 text-left transition-colors ${
                        mapActive === o.id
                          ? 'border-gp-600 bg-gp-50'
                          : 'border-slate-200 bg-white hover:border-gp-300'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-graphite">{o.name}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{o.short}</span>
                    </button>
                  </li>
                ))}
              </ul>
              <Link to="/map" className="btn-outline">
                Открыть полную карту
                <ArrowRightIcon className="h-4 w-4" aria-hidden />
              </Link>
            </div>
            <div className="card overflow-hidden">
              <GazpromMap
                objects={mapObjects}
                activeId={mapActive}
                onActiveChange={setMapActive}
                className="h-[420px] sm:h-[480px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* НОВОСТИ ОБЛАСТИ */}
      <section className="bg-slate-50 py-14 sm:py-16" aria-labelledby="region-news">
        <div className="container-page">
          <SectionHeader
            id="region-news"
            title="Новости Калининградской области"
            subtitle="Газификация, производство, инфраструктура и социальные проекты в регионе."
            linkTo="/news"
            linkLabel="Все новости региона"
          />
          <div className="grid gap-5 md:grid-cols-3">
            {regionNews.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        </div>
      </section>

      {/* ФЕДЕРАЛЬНЫЙ БЛОК */}
      <section className="py-12" aria-labelledby="federal">
        <div className="container-page">
          <div className="card grid gap-6 p-7 md:grid-cols-[auto_1fr_auto] md:items-center md:p-8">
            <span className="grid h-12 w-12 place-items-center rounded-lg bg-gp-600 text-white">
              <PeopleIcon className="h-6 w-6" aria-hidden />
            </span>
            <div>
              <h2 id="federal" className="text-lg font-bold text-graphite">
                Новости ПАО «Газпром»
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Федеральные пресс-релизы и события Группы Газпрома публикуются на корпоративном сайте
                компании. Также доступны официальные ресурсы организаций в регионе.
              </p>
            </div>
            <a href="https://www.gazprom.ru/press/news/" target="_blank" rel="noreferrer" className="btn-primary md:justify-self-end">
              gazprom.ru — пресс-центр
              <ArrowRightIcon className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-xl bg-navy p-8 text-white sm:p-12">
            <SmartImage
              image={IMAGES.amber}
              className="absolute inset-0"
              imgClassName="opacity-25"
            />
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl font-bold sm:text-3xl">Вопросы по газификации?</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-white/85">
                Порядок подключения, клиентские центры, единые телефоны и аварийные контакты
                газовых служб области — в одном разделе.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/gasification" className="btn-primary">
                  Газификация
                </Link>
                <Link to="/contacts" className="btn-ghost-light">
                  Контакты
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
