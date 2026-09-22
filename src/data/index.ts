import { NEWS } from './news';
import { MANAGEMENT } from './management';
import { EMPLOYEE_ROLES } from './employees';
import { STRUCTURE } from './structure';
import { FACILITIES, MAP_OBJECTS } from './facilities';
import { PROJECTS } from './projects';
import { CONTACTS } from './contacts';

/**
 * Тонкий слой доступа к данным. Компоненты вызывают только эти функции —
 * при подключении реального API меняется лишь их реализация.
 * TODO: заменить статические массивы на запросы к API/CMS.
 */

export { NEWS, MANAGEMENT, EMPLOYEE_ROLES, STRUCTURE, FACILITIES, MAP_OBJECTS, PROJECTS, CONTACTS };

export const NEWS_CATEGORIES = [
  'Все',
  'Важное',
  'Газификация',
  'Инфраструктура',
  'Производство',
  'Социальные проекты',
  'Экология',
] as const;

export function getNews() {
  return [...NEWS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getRegionNews() {
  return getNews().filter((n) => n.scope === 'region');
}

export function getNewsBySlug(slug: string) {
  return NEWS.find((n) => n.slug === slug);
}

export function getRelatedNews(slug: string, limit = 3) {
  return getNews().filter((n) => n.slug !== slug).slice(0, limit);
}

export function getManagement() {
  return MANAGEMENT;
}

export function getFacilities() {
  return FACILITIES;
}

export function getFacilityBySlug(slug: string) {
  return FACILITIES.find((f) => f.slug === slug);
}

export function getProjects() {
  return PROJECTS;
}

export function getProjectBySlug(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getStructure() {
  return STRUCTURE;
}

export function getMapObjects() {
  return MAP_OBJECTS;
}

export function getContacts() {
  return CONTACTS;
}

export function formatDate(iso: string): string {
  const months = [
    'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
    'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря',
  ];
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}
