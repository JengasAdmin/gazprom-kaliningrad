import type { Person } from './types';

/**
 * Персоналии — только подтверждённые официальными источниками.
 * Портреты Правления — официальные фото с сайта ПАО «Газпром» (gazprom.ru).
 */

const BOARD_URL = 'https://www.gazprom.ru/about/management/board/';

const boardSource = { label: 'gazprom.ru — Правление ПАО «Газпром»', url: BOARD_URL };

/** Правление ПАО «Газпром» — федеральный уровень (официальный состав на сайте gazprom.ru). */
export const BOARD: Person[] = [
  {
    id: 'miller',
    name: 'Миллер Алексей Борисович',
    position: 'Председатель Правления ПАО «Газпром», заместитель Председателя Совета директоров ПАО «Газпром»',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/38/451105/h221_miller_4.jpg',
      alt: 'А. Б. Миллер, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'aksyutin',
    name: 'Аксютин Олег Евгеньевич',
    position: 'Заместитель Председателя Правления — начальник Департамента (перспективное развитие)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/21/912275/h221_aksyutin_small.jpg',
      alt: 'О. Е. Аксютин, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'ilyukhina',
    name: 'Илюхина Елена Анатольевна',
    position: 'Заместитель Председателя Правления',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/f/posts/29/550919/ilyukhina_small_1.jpg',
      alt: 'Е. А. Илюхина, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'kupriyanov',
    name: 'Куприянов Сергей Владимирович',
    position: 'Заместитель Председателя Правления — начальник Департамента (информационная политика)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/f/posts/22/747068/kupriyanov_small_3.jpg',
      alt: 'С. В. Куприянов, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'markelov',
    name: 'Маркелов Виталий Анатольевич',
    position: 'Заместитель Председателя Правления ПАО «Газпром»',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/26/206810/h221_markelov-small.jpg',
      alt: 'В. А. Маркелов, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'putin-me',
    name: 'Путин Михаил Евгеньевич',
    position: 'Заместитель Председателя Правления ПАО «Газпром»',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/00/489735/h221_putin-preview.jpg',
      alt: 'М. Е. Путин, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'rosseev',
    name: 'Россеев Михаил Николаевич',
    position: 'Заместитель Председателя Правления — главный бухгалтер ПАО «Газпром»',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/f/posts/10/754891/rosseev_small.jpg',
      alt: 'М. Н. Россеев, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'sadygov',
    name: 'Садыгов Фамил Камилович',
    position: 'Заместитель Председателя Правления ПАО «Газпром»',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/76/234195/h221_f-sadygov_small.jpg',
      alt: 'Ф. К. Садыгов, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'homyakov',
    name: 'Хомяков Сергей Федорович',
    position: 'Заместитель Председателя Правления ПАО «Газпром», генеральный директор филиала ПАО «Газпром» Служба корпоративной защиты ПАО «Газпром»',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/28/374469/h221_homyakov_small.jpg',
      alt: 'С. Ф. Хомяков, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'kuznets',
    name: 'Кузнец Сергей Иванович',
    position: 'Начальник Департамента (правовое обеспечение)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/01/530621/h221_si-kuznets_small.jpg',
      alt: 'С. И. Кузнец, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'markov',
    name: 'Марков Владимир Константинович',
    position: 'Начальник Департамента (взаимодействие с органами власти Российской Федерации)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/21/053209/h221_markov_small.jpg',
      alt: 'В. К. Марков, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'menshikov',
    name: 'Меньшиков Сергей Николаевич',
    position: 'Начальник Департамента (разведка и добыча углеводородов)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/39/042199/h221_menshikov_small.jpg',
      alt: 'С. Н. Меньшиков, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'mikhalenko',
    name: 'Михаленко Вячеслав Александрович',
    position: 'Начальник Департамента (транспортировка и подземное хранение газа)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/21/189811/h221_mikhalenko-preview.jpg',
      alt: 'В. А. Михаленко, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
  {
    id: 'simdyakin',
    name: 'Симдякин Вадим Михайлович',
    position: 'Начальник Департамента (реализация углеводородов и продуктов их переработки на внутреннем рынке, электроэнергетика, развитие газоснабжения и газификация)',
    org: 'ПАО «Газпром»',
    photo: {
      src: 'https://www.gazprom.ru/preview/f/posts/49/824208/h221_v_simdyakin-small.jpg',
      alt: 'В. М. Симдякин, официальный портрет',
      credit: 'Фото: ПАО «Газпром»',
    },
    source: boardSource,
    verified: true,
  },
];

/**
 * Региональные руководители.
 * Официальные портреты в свободном доступе отсутствуют, поэтому вместо
 * фотографий используются нейтральные плейсхолдеры с инициалами.
 * TODO: verify official source — при появлении официальных портретов добавить photo.
 */
export const MANAGEMENT: Person[] = [
  {
    id: 'dimakov',
    name: 'Димаков Александр Евгеньевич',
    position: 'Генеральный директор',
    org: 'АО «Калининградгазификация»',
    bio: [
      'Возглавляет газораспределительную организацию Калининградской области с марта 2025 года. АО «Калининградгазификация» отвечает за эксплуатацию газовых сетей региона, техприсоединение и догазификацию, аварийно-диспетчерскую службу.',
    ],
    source: {
      label: 'gaz39.ru — Руководство',
      url: 'https://gaz39.ru/rukovodstvo',
    },
    verified: true,
  },
  {
    id: 'chursinov',
    name: 'Чурсинов Сергей Сергеевич',
    position: 'Начальник филиала «Калининградское УПХГ»',
    org: 'ООО «Газпром ПХГ»',
    bio: [
      'Руководит Калининградским управлением подземного хранения газа — филиалом ООО «Газпром ПХГ», эксплуатирующим Калининградское подземное хранилище газа в посёлке Романово Зеленоградского округа.',
    ],
    source: {
      label: 'ugs.gazprom.ru — Калининградское УПХГ',
      url: 'https://ugs.gazprom.ru/branches/kaliningradskoe-uphg',
    },
    verified: true,
  },
  {
    id: 'tomashevskiy',
    name: 'Томашевский Сергей Генрихович',
    position: 'Начальник Калининградского ЛПУМГ',
    org: 'ООО «Газпром трансгаз Санкт-Петербург»',
    bio: [
      'С 2007 года работал главным инженером Калининградского ЛПУМГ, с 2023 года руководит подразделением. Калининградское ЛПУМГ эксплуатирует магистральные газопроводы на территории области.',
    ],
    source: {
      label: 'spb-tr.gazprom.ru — Руководство филиала',
      url: 'https://spb-tr.gazprom.ru/about/personal/',
    },
    verified: true,
  },
  {
    id: 'kobylin',
    name: 'Кобылин Евгений Александрович',
    position: 'Директор филиала в Калининградской области',
    org: 'ООО «Газпром межрегионгаз Санкт-Петербург»',
    bio: [
      'Руководит филиалом газоснабжающей компании в Калининградской области: поставка газа потребителям, развитие клиентских центров и пунктов приёма документов в районах региона.',
    ],
    source: {
      label: 'peterburgregiongaz.ru — новости филиала',
      url: 'https://www.peterburgregiongaz.ru/press/novosti-kompanii/full/item/9438',
    },
    verified: true,
  },
];
