import type { Person } from '../../data/types';
import { EyeIcon } from './icons';

/**
 * Пометка о том, что персоналия подтверждена официальным источником,
 * со ссылкой на источник. Фото персон не публикуем: официальный портрет
 * отсутствует в свободном доступе.
 */
export function VerifiedBadge({ person }: { person: Person }) {
  return (
    <div className="border-t border-slate-100 pt-3 text-xs text-slate-400">
      <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
        <svg viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="currentColor" aria-hidden>
          <path d="M10 1.5 12 4l3-.5.5 3 2.5 1.8-1.5 2.7 1.5 2.7-2.5 1.8-.5 3-3-.5-2 2.5-2-2.5-3 .5-.5-3L2.5 13 4 10.3 2.5 7.6 5 5.8l.5-3 3 .5L10 1.5Z" opacity=".9" />
          <path d="m6.5 10.2 2.3 2.3 4.7-4.7" fill="none" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Должность подтверждена
      </span>
      {person.source && (
        <>
          {' '}
          <a href={person.source.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 underline decoration-slate-300 hover:text-gp-700">
            <EyeIcon className="h-3.5 w-3.5" aria-hidden />
            источник: {person.source.label}
          </a>
        </>
      )}
    </div>
  );
}
