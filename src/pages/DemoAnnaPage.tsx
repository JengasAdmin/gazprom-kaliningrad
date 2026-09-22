import { Link } from 'react-router-dom';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { FlameIcon, WarningIcon, ArrowRightIcon } from '../components/ui/icons';

/**
 * ДЕМО-страница для теста макета карточки руководителя.
 * Персонаж «Анна С.» и её биография полностью вымышлены; страница помечена
 * дисклеймером и закрыта от индексации (noindex), в sitemap отсутствует.
 */
const LEGEND = [
  'Анна Сергеевна родилась в Советске — маленьком городе на самой границе, где два моста через Неман соединяют Россию и Литву, а зимой над рекой всегда стоит пар от тёплой воды очистных сооружений. Её дед строил компрессорные станции, отец тридцать лет проработал обходчиком на магистральной трассе, и, по семейной легенде, трёхлетняя Аня засыпала под гул «летящего газа» — так она называла гул трубопровода за забором.',
  'В школе она выиграла олимпиаду по физике с работой о дросселировании газа — и её пригласили на экскурсию на компрессорную станцию. По словам самой Анны Сергеевны, именно тогда она поняла: «энергия — это не абстракция из учебника, это гудящая сталь, которая не имеет права остановиться».',
  'Она прошла весь путь снизу вверх: оператор ГРС в ночную смену, инженер, молодой руководитель аварийной бригады, отличившейся при ликвидации последствий ледяного шторма, — и первая женщина в истории компании, возглавившая Правление. Её фирменный стиль — приезжать на объекты без предупреждения и пить чай в дежурке, а не в переговорной.',
  'Под её началом компания довела подземные хранилища до рекордных объёмов и стала закладывать в проекты «правило трёх независимостей»: каждая система региона должна работать независимо от транзита, погоды и импорта. «Газ должен приходить к людям даже тогда, когда всё остальное решило отдохнуть», — любит повторять она.',
];

const FACTS = [
  { label: 'Должность', value: 'Председатель Правления — высшая исполнительная должность компании' },
  { label: 'Начало пути', value: 'Ночная смена оператора ГРС' },
  { label: 'Известна как', value: 'Автор «правила трёх независимостей» в проектной практике' },
  { label: 'Профессиональный каприз', value: 'Чай из термоса на объектах — даже на форумах мирового уровня' },
];

export default function DemoAnnaPage() {
  useSEO({
    title: 'Демо-макет: вымышленный персонаж — Газпром — Калининградская область',
    description: 'Тестовая страница макета карточки руководителя. Персонаж вымышлен.',
    path: '/demo',
    noindex: true,
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Руководство', to: '/management' }, { label: 'Демо-макет' }]} />

      {/* Дисклеймер */}
      <div className="container-page pt-2">
        <div
          role="note"
          className="flex flex-wrap items-center gap-3 rounded-lg border-2 border-amber-400 bg-amber-50 px-5 py-4"
        >
          <WarningIcon className="h-6 w-6 shrink-0 text-amber-600" aria-hidden />
          <p className="text-sm font-semibold text-graphite">
            ДЕМО-СТРАНИЦА · ПЕРСОНАЖ ВЫМЫШЛЕН
            <span className="mt-0.5 block text-[13px] font-normal text-slate-600">
              «Анна С.» и её биография — полностью выдуманная легенда для теста макета карточки
              руководителя. Совпадения с реальными людьми случайны. Страница закрыта от поисковиков
              и отсутствует в меню и карте сайта.
            </span>
          </p>
        </div>
      </div>

      {/* Карточка-герой */}
      <article className="container-page pb-16 pt-8">
        <section className="relative overflow-hidden rounded-xl bg-navy text-white" aria-labelledby="anna-name">
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,121,194,.55),transparent_60%)]"
            aria-hidden
          />
          <div className="relative z-10 flex flex-wrap items-start gap-8 p-8 sm:p-12">
            <div
              aria-hidden
              className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border-2 border-white/25 bg-white/10 text-4xl font-extrabold tracking-wide"
            >
              АС
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-2 inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-gp-200">
                <FlameIcon className="h-4 w-4" aria-hidden />
                Легенда компании
              </p>
              <h1 id="anna-name" className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                Анна С.
              </h1>
              <p className="mt-2 text-lg font-semibold text-gp-200">
                Председатель Правления ПАО «Газпром»
              </p>
              <p className="mt-1 text-sm text-white/70">Высшая исполнительная должность в компании</p>
            </div>
          </div>
        </section>

        {/* Факты */}
        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {FACTS.map((f) => (
            <div key={f.label} className="card p-5">
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{f.label}</dt>
              <dd className="mt-2 text-sm font-semibold leading-relaxed text-graphite">{f.value}</dd>
            </div>
          ))}
        </dl>

        {/* Легенда */}
        <section className="mt-10 max-w-3xl" aria-labelledby="legend">
          <h2 id="legend" className="text-2xl font-bold text-graphite">Легенда</h2>
          <div className="rich-text mt-4 text-[16px]">
            {LEGEND.map((p, i) => (
              <p key={i} className="!text-[16px] !leading-relaxed">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 rounded-lg bg-slate-50 p-4 text-sm text-slate-500">
            Ещё раз: всё вышеописанное — художественный вымысел для теста дизайна. Реальное
            руководство компании — в разделе{' '}
            <Link to="/management" className="font-semibold text-gp-700 underline decoration-gp-200">
              «Руководство»
            </Link>
            .
          </p>
        </section>

        <Link to="/management" className="btn-outline mt-8">
          <ArrowRightIcon className="h-4 w-4 rotate-180" aria-hidden />
          Вернуться к руководству
        </Link>
      </article>
    </>
  );
}
