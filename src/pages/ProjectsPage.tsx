import { getProjects } from '../data';
import { useSEO } from '../lib/seo';
import { Breadcrumbs } from '../components/ui/Breadcrumbs';
import { ProjectCard } from '../components/ui/ProjectCard';

export default function ProjectsPage() {
  const projects = getProjects();

  useSEO({
    title: `Проекты — Газпром — Калининградская область`,
    description:
      'Крупные проекты Группы Газпрома в Калининградской области: энергетическая безопасность региона, ПХГ, терминал СПГ, газификация, «Газпром — детям».',
    path: '/projects',
  });

  return (
    <>
      <Breadcrumbs items={[{ label: 'Проекты' }]} />
      <div className="container-page pb-16">
        <header className="max-w-3xl">
          <h1 className="text-3xl font-extrabold tracking-tight text-graphite sm:text-4xl">Проекты</h1>
          <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
            Ключевые региональные проекты — от комплекса энергетической безопасности эксклавной
            области до социальных программ. Статусы и даты подтверждены официальными публикациями.
          </p>
        </header>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </>
  );
}
