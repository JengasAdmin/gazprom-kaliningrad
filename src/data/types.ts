/**
 * Domain types for the regional portal.
 * Data modules in this folder are structured so they can later be replaced
 * by an API/CMS without touching the components.
 */

export interface ImageRef {
  src: string;
  alt: string;
  /** Author / license attribution for externally hosted photos */
  credit?: string;
  /** Link to the original file page (license attribution) */
  creditUrl?: string;
}

export type NewsCategory =
  | 'Газификация'
  | 'Инфраструктура'
  | 'Производство'
  | 'Социальные проекты'
  | 'Экология'
  | 'Кадры'
  | 'Корпоративные события'
  | 'Важное';

export type NewsScope = 'region' | 'federal';

export interface NewsSource {
  label: string;
  url: string;
}

export interface NewsItem {
  id: string;
  slug: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  category: NewsCategory;
  scope: NewsScope;
  title: string;
  excerpt: string;
  /** Article paragraphs, own wording based on the cited source */
  body: string[];
  image?: ImageRef;
  source?: NewsSource;
  projectSlug?: string;
  important?: boolean;
}

export interface Person {
  id: string;
  name: string;
  position: string;
  org: string;
  orgShort?: string;
  bio?: string[];
  education?: string;
  career?: string[];
  /** Only official portraits; otherwise initials placeholder is rendered */
  photo?: ImageRef;
  source?: NewsSource;
  verified: boolean;
}

export type EmployeeGroupId =
  | 'engineering'
  | 'technical'
  | 'production'
  | 'gasification'
  | 'safety'
  | 'admin'
  | 'callcenter'
  | 'other';

export interface EmployeeRole {
  id: string;
  group: EmployeeGroupId;
  title: string;
  description: string;
  org?: string;
}

export interface StructureNode {
  id: string;
  name: string;
  shortName?: string;
  level: 1 | 2 | 3;
  parentId?: string;
  function: string;
  region?: string;
  website?: string;
  phone?: string;
  address?: string;
  description: string[];
  source?: NewsSource;
  /** true — membership/affiliation confirmed by an official source */
  confirmed: boolean;
}

export type FacilityType =
  | 'Подземное хранилище газа'
  | 'Магистральный газопровод'
  | 'Газораспределительная станция'
  | 'Объект газификации'
  | 'СПГ-терминал'
  | 'Административный объект'
  | 'Социальный объект';

export type MapCategory =
  | 'production'
  | 'storage'
  | 'pipeline'
  | 'gasification'
  | 'admin'
  | 'social';

export interface Facility {
  id: string;
  slug: string;
  name: string;
  type: FacilityType;
  mapCategory: MapCategory;
  location: string;
  /** [lat, lng]; approximate coordinates are marked in the notes */
  coords?: [number, number];
  coordsNote?: string;
  status?: string;
  description: string[];
  facts?: { label: string; value: string }[];
  image?: ImageRef;
  source?: NewsSource;
}

export interface MapObject {
  id: string;
  facilitySlug?: string;
  name: string;
  mapCategory: MapCategory;
  coords: [number, number];
  short: string;
  image?: ImageRef;
  link?: string;
}

export type ProjectStatus = 'Реализуется' | 'Завершён' | 'Подготовка';

export interface Project {
  id: string;
  slug: string;
  name: string;
  status: ProjectStatus;
  territory: string;
  period?: string;
  description: string[];
  image?: ImageRef;
  source?: NewsSource;
  relatedNewsSlugs?: string[];
}

export interface ContactCard {
  id: string;
  audience: string;
  title: string;
  org: string;
  address?: string;
  phone?: string;
  phoneNote?: string;
  email?: string;
  hours?: string;
  website?: string;
  note?: string;
  source?: NewsSource;
}

export interface SiteSectionLink {
  label: string;
  to: string;
}

export interface FaqItem {
  question: string;
  answer: string;
  source?: NewsSource;
}
