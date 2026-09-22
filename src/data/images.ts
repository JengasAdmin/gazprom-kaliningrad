import type { ImageRef } from './types';

/**
 * Фотографии — Wikimedia Commons (свободные лицензии).
 * Каждое изображение проверено через API Commons; указана лицензия и страница файла.
 * Фотографии носят иллюстративный характер: они не позиционируются как снимки
 * конкретных объектов, если это не указано в alt/caption.
 */
const commons = (file: string) => `https://commons.wikimedia.org/wiki/File:${file}`;

export const IMAGES = {
  heroPipeline: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/Nord_Stream_pipe_in_Kotka.jpg',
    alt: 'Трубы магистрального газопровода на площадке для хранения',
    credit: 'Wikimedia Commons, лицензия CC BY 4.0',
    creditUrl: commons('Nord_Stream_pipe_in_Kotka.jpg'),
  },
  pipesStack: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Stack_of_pipes_North_Stream_2.jpg',
    alt: 'Штабель труб газопровода на строительной площадке',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 4.0',
    creditUrl: commons('Stack_of_pipes_North_Stream_2.jpg'),
  },
  welding: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/8/83/Nord_Stream_-_two_pipes_are_welded_together_on_the_Castoro_Sei_pipelaying_vessel.jpg',
    alt: 'Сварка труб газопровода на трубоукладочном судне',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 3.0',
    creditUrl: commons('Nord_Stream_-_two_pipes_are_welded_together_on_the_Castoro_Sei_pipelaying_vessel.jpg'),
  },
  offshorePipe: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Lubmin_Nord_Stream_Offshore-Rohr.jpg',
    alt: 'Секция морского газопровода',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 3.0',
    creditUrl: commons('Lubmin_Nord_Stream_Offshore-Rohr.jpg'),
  },
  compressor: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b6/Volovets_gas_compressor_station.jpg',
    alt: 'Компрессорная станция газопровода',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 4.0',
    creditUrl: commons('Volovets_gas_compressor_station.jpg'),
  },
  kaliningradNight: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/b/b7/Kaliningrad%2C_Russia%2C_Pregolya_River%2C_Kant_Island_and_the_Cathedral_at_night.jpg',
    alt: 'Вечерний Калининград: остров Канта и Кафедральный собор над Преголей',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 4.0',
    creditUrl: commons('Kaliningrad,_Russia,_Pregolya_River,_Kant_Island_and_the_Cathedral_at_night.jpg'),
  },
  kaliningradCathedral: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/c9/Old_cathedral_of_Kaliningrad_in_Russia.jpg',
    alt: 'Кафедральный собор на острове Канта, Калининград',
    credit: 'Wikimedia Commons, public domain',
    creditUrl: commons('Old_cathedral_of_Kaliningrad_in_Russia.jpg'),
  },
  curonianSpit: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/3/3d/Curonian_Spit_-_Dunes_view_from_Epha_Berg.jpg',
    alt: 'Дюны Куршской косы, вид с высоты Эфа',
    credit: 'Wikimedia Commons, лицензия CC BY 3.0',
    creditUrl: commons('Curonian_Spit_-_Dunes_view_from_Epha_Berg.jpg'),
  },
  svetlogorsk: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/a/a1/Svetlogorsk_promenade_2021-08.jpg',
    alt: 'Приморский променад в Светлогорске',
    credit: 'Wikimedia Commons, лицензия CC0',
    creditUrl: commons('Svetlogorsk_promenade_2021-08.jpg'),
  },
  baltiysk: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Baltiysk_-_Harbour_and_lighthouse.jpg',
    alt: 'Гавань и маяк в Балтийске',
    credit: 'Wikimedia Commons, лицензия CC BY 3.0',
    creditUrl: commons('Baltiysk_-_Harbour_and_lighthouse.jpg'),
  },
  amber: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Tumble-polished_Baltic_amber_1.jpg',
    alt: 'Отполированные янтарные камни — символ Калининградской области',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 4.0',
    creditUrl: commons('Tumble-polished_Baltic_amber_1.jpg'),
  },
  cngStation: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/CNG_Trans_Filling_Station_1.jpg',
    alt: 'Автомобильная газонаполнительная компрессорная станция',
    credit: 'Wikimedia Commons, лицензия CC BY-SA 4.0',
    creditUrl: commons('CNG_Trans_Filling_Station_1.jpg'),
  },
  lngCarrier: {
    src: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/LNG_carrier_autonomously_sailing_across_the_Bering_Strait.jpg',
    alt: 'Газовоз СПГ в море, вид с высоты',
    credit: 'Wikimedia Commons, лицензия CC BY (содержит изменённые данные Copernicus Sentinel)',
    creditUrl: commons('LNG_carrier_autonomously_sailing_across_the_Bering_Strait.jpg'),
  },
} satisfies Record<string, ImageRef>;

export type ImageKey = keyof typeof IMAGES;
