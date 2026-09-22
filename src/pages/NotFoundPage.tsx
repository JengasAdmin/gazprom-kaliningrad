import { Link } from 'react-router-dom';
import { useSEO } from '../lib/seo';

export default function NotFoundPage() {
  useSEO({
    title: 'Страница не найдена — Газпром — Калининградская область',
    description: 'Запрашиваемая страница не найдена.',
    path: '/404',
  });

  return (
    <div className="container-page grid place-items-center py-24 text-center">
      <div>
        <p className="text-6xl font-extrabold text-gp-600">404</p>
        <h1 className="mt-4 text-2xl font-bold text-graphite">Страница не найдена</h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-slate-600">
          Возможно, адрес указан неверно или материал был перемещён. Воспользуйтесь навигацией
          или поиском по сайту.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link to="/" className="btn-primary">На главную</Link>
          <Link to="/news" className="btn-outline">Новости</Link>
        </div>
      </div>
    </div>
  );
}
