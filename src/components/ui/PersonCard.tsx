import type { Person } from '../../data/types';
import { VerifiedBadge } from './VerifiedBadge';

function initials(name: string): string {
  const parts = name.replace(/ё/g, 'е').split(/\s+/);
  return parts.length >= 3
    ? `${parts[1][0]}${parts[2][0]}`.toUpperCase()
    : parts.map((p) => p[0]?.toUpperCase() ?? '').join('').slice(0, 2);
}

function shortName(name: string): string {
  const parts = name.split(/\s+/);
  if (parts.length >= 3) return `${parts[1]} ${parts[2][0]}.`;
  return name;
}

export function PersonCard({ person }: { person: Person }) {
  return (
    <article className="card flex h-full flex-col p-6">
      <div className="flex items-start gap-4">
        {person.photo ? (
          <img
            src={person.photo.src}
            alt={person.photo.alt}
            className="photo h-20 w-20 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
        ) : (
          <div
            aria-hidden
            className="grid h-20 w-20 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gp-700 to-gp-500 text-xl font-bold text-white"
          >
            {initials(person.name)}
          </div>
        )}
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
