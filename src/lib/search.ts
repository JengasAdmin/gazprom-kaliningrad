import {
  NEWS,
  MANAGEMENT,
  EMPLOYEE_ROLES,
  FACILITIES,
  PROJECTS,
  STRUCTURE,
} from '../data';

export interface SearchResult {
  id: string;
  kind: 'news' | 'management' | 'employees' | 'facilities' | 'projects' | 'structure';
  kindLabel: string;
  title: string;
  snippet: string;
  to: string;
  date?: string;
}

export const KIND_LABELS: Record<SearchResult['kind'], string> = {
  news: 'Новости',
  management: 'Руководство',
  employees: 'Сотрудники',
  facilities: 'Объекты',
  projects: 'Проекты',
  structure: 'Структура',
};

function stripTags(s: string) {
  return s;
}

function highlight(text: string, query: string): string {
  return text;
}

export { highlight, stripTags };

function buildIndex(): SearchResult[] {
  const idx: SearchResult[] = [];

  for (const n of NEWS) {
    idx.push({
      id: `news-${n.id}`,
      kind: 'news',
      kindLabel: 'Новость',
      title: n.title,
      snippet: n.excerpt,
      to: `/news/${n.slug}`,
      date: n.date,
    });
  }

  for (const p of MANAGEMENT) {
    idx.push({
      id: `mgmt-${p.id}`,
      kind: 'management',
      kindLabel: 'Руководитель',
      title: `${p.name}`,
      snippet: `${p.position}, ${p.org}${p.bio ? `. ${p.bio[0]}` : ''}`,
      to: '/management',
    });
  }

  for (const r of EMPLOYEE_ROLES) {
    idx.push({
      id: `emp-${r.id}`,
      kind: 'employees',
      kindLabel: 'Специалисты',
      title: r.title,
      snippet: r.description,
      to: '/employees',
    });
  }

  for (const f of FACILITIES) {
    idx.push({
      id: `fac-${f.id}`,
      kind: 'facilities',
      kindLabel: f.type,
      title: f.name,
      snippet: `${f.location}. ${f.description[0]}`,
      to: `/facilities/${f.slug}`,
    });
  }

  for (const p of PROJECTS) {
    idx.push({
      id: `prj-${p.id}`,
      kind: 'projects',
      kindLabel: `Проект — ${p.status}`,
      title: p.name,
      snippet: `${p.territory}. ${p.description[0]}`,
      to: `/projects/${p.slug}`,
    });
  }

  for (const s of STRUCTURE) {
    idx.push({
      id: `str-${s.id}`,
      kind: 'structure',
      kindLabel: 'Организация',
      title: s.name,
      snippet: `${s.function}. ${s.description[0]}`,
      to: '/structure',
    });
  }

  return idx;
}

const INDEX = buildIndex();

function normalize(s: string) {
  return s.toLowerCase().replace(/ё/g, 'е');
}

export function search(query: string, limit = 24): SearchResult[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [];
  const terms = q.split(/\s+/).filter(Boolean);
  const scored: { r: SearchResult; score: number }[] = [];

  for (const r of INDEX) {
    const title = normalize(r.title);
    const snippet = normalize(r.snippet);
    let score = 0;
    let ok = true;
    for (const t of terms) {
      if (title.includes(t)) score += 10;
      else if (snippet.includes(t)) score += 4;
      else {
        ok = false;
        break;
      }
    }
    if (ok) scored.push({ r, score });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.r);
}

/** Разбивает текст на части с выделением совпадений для отображения. */
export function splitHighlight(text: string, query: string): { text: string; hit: boolean }[] {
  const q = normalize(query.trim());
  if (q.length < 2) return [{ text, hit: false }];
  const terms = q.split(/\s+/).filter(Boolean).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'));
  const re = new RegExp(`(${terms.join('|')})`, 'gi');
  const normText = normalize(text);
  // Ищем по нормализованной строке, но отдаём куски оригинала (регистр сохраняется).
  const parts: { text: string; hit: boolean }[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(normText))) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index), hit: false });
    parts.push({ text: text.slice(m.index, m.index + m[0].length), hit: true });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last), hit: false });
  return parts;
}
