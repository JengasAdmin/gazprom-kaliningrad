import { Link } from 'react-router-dom';
import { getBoard, getManagement } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { PersonCard, PersonCardCompact } from '../components/ui/PersonCard';
import { IMAGES } from '../data/images';
import { SmartImage } from '../components/ui/SmartImage';
import { ArrowRightIcon, WarningIcon } from '../components/ui/icons';

export default function ManagementPage() {
  const people = getManagement();
  const board = getBoard();

  useSEO({
    title: `Руководство — Газпром — Калининградская область`,
    description:
      'Правление ПАО «Газпром» (официальный состав) и руководители организаций Группы Газпрома в Калининградской области — должности подтверждены официальными источниками.',
    path: '/management',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Руководство' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Руководство</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            На странице публикуются только руководители, чьи должности подтверждены официальными
            сайтами организаций. Портреты Правления — официальные фотографии ПАО «Газпром».
          </p>
        </header>

        {/* Правление ПАО «Газпром» — федеральный уровень */}
        <section className="mt-10" aria-labelledby="board-block">
          <h2 id="board-block" className="text-xl font-bold text-graphite sm:text-2xl">
            Правление ПАО «Газпром»
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            Коллегиальный исполнительный орган компании. Состав приведён по официальному сайту
            ПАО «Газпром»; к работе в Калининградской области напрямую относятся направления
            перспективного развития, транспортировки и подземного хранения газа, газификации.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {board.map((p) => (
              <PersonCardCompact key={p.id} person={p} />
            ))}
          </div>
        </section>

        {/* Руководители организаций в регионе */}
        <section className="mt-14" aria-labelledby="regional-block">
          <h2 id="regional-block" className="text-xl font-bold text-graphite sm:text-2xl">
            Руководители организаций в Калининградской области
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
            Официальные портреты региональных руководителей в открытых источниках отсутствуют,
            поэтому используются нейтральные плейсхолдеры с инициалами.
          </p>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {people.map((p) => (
              <PersonCard key={p.id} person={p} />
            ))}
          </div>
        </section>

        {/* Принципы публикации */}
        <div className="mt-12 grid items-center gap-8 rounded-xl border border-slate-200 bg-slate-50 p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr]">
          <SmartImage image={IMAGES.kaliningradCathedral} className="h-56 overflow-hidden rounded-lg lg:h-64" />
          <div>
            <h2 className="text-xl font-bold text-graphite">О принципах публикации</h2>
            <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
              Сведения о персоналиях проверяются по официальным сайтам организаций Группы Газпрома
              и государственных реестров; рядом с каждой карточкой указан источник. Если данные о
              руководителе или его фотографии нет в официальных публикациях, соответствующие поля
              не заполняются. Полный перечень организаций региона — в разделе «Структура».
            </p>
            <p className="mt-3 text-xs text-slate-400">TODO: verify official source — данные обновляются по мере выхода официальных публикаций.</p>
          </div>
        </div>

        {/* Демо-страница вымышленного персонажа */}
        <Link
          to="/demo"
          className="mt-8 flex flex-wrap items-center gap-4 rounded-xl border-2 border-dashed border-amber-300 bg-amber-50/60 p-5 transition-colors hover:border-amber-400"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-amber-100 text-amber-700">
            <WarningIcon className="h-5 w-5" aria-hidden />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block text-[15px] font-bold text-graphite">
              Демо-страница макета: вымышленный персонаж
            </span>
            <span className="mt-0.5 block text-sm text-slate-600">
              Тестовая карточка руководителя с придуманной легендой. Персонал и биография вымышлены,
              к реальным сотрудникам отношения не имеют.
            </span>
          </span>
          <ArrowRightIcon className="h-5 w-5 shrink-0 text-amber-600" aria-hidden />
        </Link>
      </div>
    </>
  );
}
