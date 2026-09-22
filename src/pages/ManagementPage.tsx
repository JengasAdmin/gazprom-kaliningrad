import { getManagement } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { PersonCard } from '../components/ui/PersonCard';
import { IMAGES } from '../data/images';
import { SmartImage } from '../components/ui/SmartImage';

export default function ManagementPage() {
  const people = getManagement();

  useSEO({
    title: `Руководство — Газпром — Калининградская область`,
    description:
      'Руководители организаций Группы Газпрома в Калининградской области: должности подтверждены официальными источниками.',
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
            сайтами организаций. Официальные портреты в свободном доступе отсутствуют, поэтому
            используются нейтральные плейсхолдеры.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {people.map((p) => (
            <PersonCard key={p.id} person={p} />
          ))}
        </div>

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
      </div>
    </>
  );
}
