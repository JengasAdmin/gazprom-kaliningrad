export interface NavItem {
  label: string;
  to?: string;
  children?: { label: string; to: string; note?: string }[];
}

export const NAV: NavItem[] = [
  { label: 'Новости', to: '/news' },
  {
    label: 'Компания',
    children: [
      { label: 'Руководство', to: '/management', note: 'Подтверждённые персоналии' },
      { label: 'Структура', to: '/structure', note: 'Организации Группы в регионе' },
      { label: 'Сотрудники', to: '/employees', note: 'Каталог специалистов' },
    ],
  },
  { label: 'Объекты', to: '/facilities' },
  { label: 'Карта', to: '/map' },
  { label: 'Газификация', to: '/gasification' },
  { label: 'Проекты', to: '/projects' },
  { label: 'Социальная деятельность', to: '/social' },
  { label: 'Контакты', to: '/contacts' },
];

export const FOOTER_NAV = {
  company: {
    title: 'Газпром — Калининградская область',
    links: [
      { label: 'О деятельности', to: '/structure' },
      { label: 'Руководство', to: '/management' },
      { label: 'Структура', to: '/structure' },
      { label: 'Объекты', to: '/facilities' },
    ],
  },
  activity: {
    title: 'Деятельность',
    links: [
      { label: 'Газификация', to: '/gasification' },
      { label: 'Проекты', to: '/projects' },
      { label: 'Карта объектов', to: '/map' },
      { label: 'Социальная деятельность', to: '/social' },
    ],
  },
  news: {
    title: 'Новости',
    links: [
      { label: 'Все новости', to: '/news' },
      { label: 'Важное', to: '/news?category=Важное' },
      { label: 'Газификация', to: '/news?category=Газификация' },
    ],
  },
  contacts: {
    title: 'Контакты',
    links: [
      { label: 'Контакты', to: '/contacts' },
      { label: 'Для населения', to: '/contacts' },
      { label: 'Аварийная служба', to: '/contacts' },
    ],
  },
};
