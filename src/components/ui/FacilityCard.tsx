import { Link } from 'react-router-dom';
import type { Facility } from '../../data/types';
import { SmartImage } from './SmartImage';
import { MapPinIcon } from './icons';

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Link to={`/facilities/${facility.slug}`} className="card-interactive group flex flex-col overflow-hidden">
      {facility.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <SmartImage
            image={facility.image}
            className="h-full"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-xs font-semibold uppercase tracking-wide text-gp-600">{facility.type}</span>
        <h3 className="mt-2 text-[16px] font-semibold leading-snug text-graphite transition-colors group-hover:text-gp-700">
          {facility.name}
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
          {facility.location}
        </p>
        {facility.status && (
          <p className="mt-3 inline-flex w-fit rounded-sm bg-gp-50 px-2 py-0.5 text-xs font-medium text-gp-800">
            {facility.status}
          </p>
        )}
      </div>
    </Link>
  );
}
