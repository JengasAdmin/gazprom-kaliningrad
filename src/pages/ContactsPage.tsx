import { getContacts } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { GazpromMap } from '../components/map/GazpromMap';
import { MAP_OBJECTS } from '../data';
import {
  PhoneIcon,
  MailIcon,
  ClockIcon,
  GlobeIcon,
  MapPinIcon,
  WarningIcon,
  ExternalLinkIcon,
} from '../components/ui/icons';

const AUDIENCE_ICONS: Record<string, (props: { className?: string }) => JSX.Element> = {
  'Для населения': PhoneIcon,
  'Для населения и организаций': PhoneIcon,
  'Аварийные и экстренные контакты': WarningIcon,
  'Газомоторное топливо': GlobeIcon,
  'Для организаций': MapPinIcon,
  'Пресс-служба': MailIcon,
};

export default function ContactsPage() {
  const contacts = getContacts();
  const officeObjects = MAP_OBJECTS.filter((o) => o.mapCategory === 'admin');

  useSEO({
    title: `Контакты — Газпром — Калининградская область`,
    description:
      'Контакты газовых служб Калининградской области: поставка газа, газораспределение, догазификация, аварийная служба 04/112, АГНКС, пресс-служба.',
    path: '/contacts',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Контакты' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Контакты</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Публикуются только официально подтверждённые адреса и телефоны организаций,
            работающих с жителями и организациями Калининградской области.
          </p>
        </header>

        {/* Аварийная служба — акцентный блок */}
        {contacts
          .filter((c) => c.id === 'c-emergency')
          .map((c) => (
            <section
              key={c.id}
              className="mt-8 rounded-xl border-2 border-red-200 bg-red-50/70 p-6 sm:p-8"
              aria-labelledby={`c-${c.id}`}
            >
              <div className="flex flex-wrap items-center gap-5">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-red-600 text-white">
                  <WarningIcon className="h-7 w-7" aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <h2 id={`c-${c.id}`} className="text-lg font-extrabold text-graphite sm:text-xl">
                    При запахе газа звоните немедленно: <a href="tel:104" className="text-red-700 underline">04</a> или{' '}
                    <a href="tel:112" className="text-red-700 underline">112</a>
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Аварийно-диспетчерская служба работает круглосуточно. Единый номер газовой службы
                    области: <a href="tel:88001003904" className="font-semibold text-gp-800">8-800-100-39-04</a>.
                    Не включайте свет и электроприборы, не пользуйтесь открытым огнём — проветрите
                    помещение и покиньте его до приезда бригады.
                  </p>
                </div>
              </div>
            </section>
          ))}

        {/* Карточки контактов */}
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {contacts
            .filter((c) => c.id !== 'c-emergency')
            .map((c) => {
              const Icon = AUDIENCE_ICONS[c.audience] ?? PhoneIcon;
              return (
                <section key={c.id} className="card flex flex-col p-6" aria-labelledby={`c-${c.id}`}>
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gp-50 text-gp-600">
                      <Icon className="h-5 w-5" aria-hidden />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-gp-600">{c.audience}</p>
                      <h2 id={`c-${c.id}`} className="mt-1 text-[16px] font-bold leading-snug text-graphite">
                        {c.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-500">{c.org}</p>
                    </div>
                  </div>

                  <dl className="mt-4 space-y-2.5 text-sm text-slate-600">
                    {c.phone && (
                      <div className="flex items-start gap-2.5">
                        <PhoneIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                        <dt className="sr-only">Телефон</dt>
                        <dd>
                          <a
                            href={`tel:${(c.phone.match(/^[\d\s()+-]+/) ?? [c.phone])[0].replace(/[^+\d]/g, '')}`}
                            className="font-semibold text-gp-800 hover:text-gp-600"
                          >
                            {c.phone}
                          </a>
                          {c.phoneNote && <span className="block text-xs text-slate-400">{c.phoneNote}</span>}
                        </dd>
                      </div>
                    )}
                    {c.email && (
                      <div className="flex items-start gap-2.5">
                        <MailIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                        <dt className="sr-only">Электронная почта</dt>
                        <dd>
                          <a href={`mailto:${c.email}`} className="hover:text-gp-700">{c.email}</a>
                        </dd>
                      </div>
                    )}
                    {c.address && (
                      <div className="flex items-start gap-2.5">
                        <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                        <dt className="sr-only">Адрес</dt>
                        <dd>{c.address}</dd>
                      </div>
                    )}
                    {c.hours && (
                      <div className="flex items-start gap-2.5">
                        <ClockIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                        <dt className="sr-only">Режим работы</dt>
                        <dd>{c.hours}</dd>
                      </div>
                    )}
                    {c.website && (
                      <div className="flex items-start gap-2.5">
                        <GlobeIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                        <dt className="sr-only">Сайт</dt>
                        <dd>
                          <a href={c.website} target="_blank" rel="noreferrer" className="font-medium text-gp-700 underline decoration-gp-200 hover:text-gp-600">
                            {c.website.replace('https://', '')}
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>

                  {c.note && <p className="mt-4 text-sm leading-relaxed text-slate-500">{c.note}</p>}
                  {c.source && (
                    <p className="mt-auto pt-4 text-xs text-slate-400">
                      Источник:{' '}
                      <a href={c.source.url} target="_blank" rel="noreferrer" className="underline decoration-slate-300 hover:text-gp-700">
                        {c.source.label}
                      </a>
                    </p>
                  )}
                </section>
              );
            })}
        </div>

        {/* Карта офисов */}
        <section className="mt-12" aria-labelledby="offices-map">
          <h2 id="offices-map" className="text-xl font-bold text-graphite">Офисы и клиентские центры</h2>
          <div className="card mt-4 overflow-hidden">
            <GazpromMap objects={officeObjects} className="h-[420px]" center={[54.72, 20.55]} initialZoom={9} />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Показаны адреса в Калининграде и Балтийске. Пункты приёма документов также работают
            в Черняховске, Гурьевске, Краснознаменске и Багратионовске.
          </p>
        </section>

        {/* Официальные ресурсы */}
        <section className="mt-12" aria-labelledby="official-sites">
          <h2 id="official-sites" className="text-xl font-bold text-graphite">Официальные сайты</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'ПАО «Газпром»', url: 'https://www.gazprom.ru' },
              { label: 'Газпром ПХГ', url: 'https://ugs.gazprom.ru' },
              { label: 'Газпром межрегионгаз СПб', url: 'https://www.peterburgregiongaz.ru' },
              { label: 'Калининградгазификация', url: 'https://gaz39.ru' },
              { label: 'Газпром трансгаз СПб', url: 'https://spb-tr.gazprom.ru' },
              { label: 'Газпром газомоторное топливо', url: 'https://gazprom-agnks.ru' },
              { label: 'Правительство Калининградской области', url: 'https://gov39.ru' },
              { label: 'Карта газификации', url: 'https://www.gazprommap.ru' },
            ].map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noreferrer" className="card-interactive flex items-center justify-between gap-3 p-4">
                  <span className="text-sm font-semibold text-graphite">{s.label}</span>
                  <ExternalLinkIcon className="h-4 w-4 shrink-0 text-gp-600" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
