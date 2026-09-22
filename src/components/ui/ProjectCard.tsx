import { Link } from 'react-router-dom';
import type { Project } from '../../data/types';
import { SmartImage } from './SmartImage';
import { MapPinIcon } from './icons';

const STATUS_STYLE: Record<Project['status'], string> = {
  'Реализуется': 'bg-emerald-50 text-emerald-700',
  'Завершён': 'bg-slate-100 text-slate-600',
  'Подготовка': 'bg-amber-50 text-amber-700',
};

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="card-interactive group flex flex-col overflow-hidden">
      {project.image && (
        <div className="aspect-[16/9] overflow-hidden">
          <SmartImage
            image={project.image}
            className="h-full"
            imgClassName="transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <span className={`rounded-sm px-2 py-0.5 text-xs font-semibold ${STATUS_STYLE[project.status]}`}>
            {project.status}
          </span>
          {project.period && <span className="text-xs text-slate-400">{project.period}</span>}
        </div>
        <h3 className="mt-3 text-[16px] font-semibold leading-snug text-graphite transition-colors group-hover:text-gp-700">
          {project.name}
        </h3>
        <p className="mt-2 flex items-start gap-1.5 text-sm text-slate-500">
          <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0 text-gp-600" aria-hidden />
          {project.territory}
        </p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-slate-600">{project.description[0]}</p>
      </div>
    </Link>
  );
}
