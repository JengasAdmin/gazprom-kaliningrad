import { useState } from 'react';
import type { Person } from '../../data/types';
import { VerifiedBadge } from './VerifiedBadge';

function initials(name: string): string {
  const parts = name.replace(/ё/g, 'е').split(/\s+/);
  // Формат «Фамилия Имя Отчество» → инициалы имени и отчества
  if (parts.length >= 3) return `${parts[1][0]}${parts[2][0]}`.toUpperCase();
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('').slice(0, 2);
}

function shortName(name: string): string {
  const parts = name.split(/\s+/);
  if (parts.length >= 3) return `${parts[0]} ${parts[1][0]}. ${parts[2][0]}.`;
  return name;
}

export function PersonPhoto({ person, size = 'h-20 w-20', rounded = 'rounded-full' }: { person: Person; size?: string; rounded?: string }) {
  const [failed, setFailed] = useState(false);

  if (person.photo && !failed) {
    return (
      <img
        src={person.photo.src}
        alt={person.photo.alt}
        loading="lazy"
        onError={() => setFailed(true)}
        className={`photo ${size} shrink-0 object-cover ${rounded}`}
      />
    );
  }
  return (
    <div
      aria-hidden
      className={`grid ${size} shrink-0 place-items-center ${rounded} bg-gradient-to-br from-gp-700 to-gp-500 text-xl font-bold text-white`}
    >
      {initials(person.name)}
    </div>
  );
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex items-start gap-4">
        <PersonPhoto person={person} />
        <div>
          <h3 className="text-[17px] font-bold leading-snug text-graphite">{shortName(person.name)}</h3>
          <p className="mt-1 text-sm font-semibold text-gp-700">{person.position}</p>
          <p className="mt-0.5 text-sm text-slate-500">{person.org}</p>
        </div>
      </div>

      {person.bio && (
        <div className="rich-text mt-4 text-sm">
          {person.bio.map((p, i) => (
            <p key={i} className="!text-sm">
              {p}
            </p>
          ))}
        </div>
      )}

      {person.career && person.career.length > 0 && (
        <div className="mt-4">
          <h4 className="text-xs font-bold uppercase tracking-wide text-slate-400">Профессиональный путь</h4>
          <ul className="mt-2 space-y-1 text-sm text-slate-600">
            {person.career.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-auto pt-4">
        <VerifiedBadge person={person} />
      </div>
    </article>
  );
}

/** Компактная карточка для большого списка (например, Правление). */
export function PersonCardCompact({ person }: { person: Person }) {
  return (
    <article className="card flex h-full items-start gap-4 p-4 sm:p-5">
      <PersonPhoto person={person} size="h-16 w-16" />
      <div className="min-w-0">
        <h3 className="text-[15px] font-bold leading-snug text-graphite">{shortName(person.name)}</h3>
        <p className="mt-1 text-[13px] font-semibold leading-snug text-gp-700">{person.position}</p>
        {person.source && (
          <a
            href={person.source.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 inline-block text-xs text-slate-400 underline decoration-slate-300 hover:text-gp-700"
          >
            источник: {person.source.label}
          </a>
        )}
      </div>
    </article>
  );
}
