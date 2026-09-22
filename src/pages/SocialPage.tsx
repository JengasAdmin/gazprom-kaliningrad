import { Link } from 'react-router-dom';
import { SOCIAL_SECTIONS } from '../data/gasification';
import { IMAGES } from '../data/images';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { SmartImage } from '../components/ui/SmartImage';
import { ArrowRightIcon, ExternalLinkIcon } from '../components/ui/icons';

export default function SocialPage() {
  useSEO({
    title: `Социальная деятельность — Газпром — Калининградская область`,
    description:
      'Социальные и экологические инициативы Группы Газпрома в Калининградской области: программа «Газпром — детям», акции на Куршской косе, поддержка региона.',
    path: '/social',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Социальная деятельность' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">
            Социальная деятельность
          </h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Раздел включает только подтверждённые публичные инициативы в Калининградской области.
            Направления социальной политики ПАО «Газпром» в масштабах страны — на корпоративном
            сайте компании.
          </p>
        </header>

        <div className="mt-10 space-y-10">
          {SOCIAL_SECTIONS.map((s) => (
            <section key={s.id} className="card overflow-hidden" aria-labelledby={`soc-${s.id}`}>
              <div className="grid md:grid-cols-[minmax(0,420px)_1fr]">
                <SmartImage image={IMAGES[s.image]} className="h-56 md:h-full" />
                <div className="p-6 sm:p-8">
                  <h2 id={`soc-${s.id}`} className="text-xl font-bold text-graphite sm:text-2xl">
                    {s.title}
                  </h2>
                  <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
                  {s.newsSlug && (
                    <Link to={`/news/${s.newsSlug}`} className="link-arrow mt-4">
                      Связанный материал
                      <ArrowRightIcon className="h-4 w-4" aria-hidden />
                    </Link>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-10 rounded-xl bg-navy p-7 text-white sm:p-10">
          <h2 className="text-xl font-bold sm:text-2xl">Социальные программы ПАО «Газпром»</h2>
          <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-white/80">
            Общероссийские направления — поддержка детей и спорта, культуры и искусства,
            экологических проектов — описаны на корпоративном сайте ПАО «Газпром».
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a href="https://www.gazprom.ru/social/" target="_blank" rel="noreferrer" className="btn-primary">
              gazprom.ru — социальная деятельность
              <ExternalLinkIcon className="h-4 w-4" aria-hidden />
            </a>
            <a href="https://rsi.gazprom.ru/social" target="_blank" rel="noreferrer" className="btn-ghost-light">
              Карта объектов «Газпром — детям»
              <ExternalLinkIcon className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
