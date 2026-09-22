import { useState } from 'react';
import type { ImageRef } from '../../data/types';

interface SmartImageProps {
  image: ImageRef;
  className?: string;
  imgClassName?: string;
  loading?: 'lazy' | 'eager';
}

/**
 * Изображение с аккуратным фолбэком: если внешняя картинка недоступна,
 * показывается нейтральный брендированный плейсхолдер вместо «сломанной» иконки.
 */
export function SmartImage({ image, className = '', imgClassName = '', loading = 'lazy' }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={image.alt}
        className={`photo grid place-items-center bg-gradient-to-br from-gp-800 via-gp-700 to-gp-500 ${className}`}
      >
        <svg viewBox="0 0 48 48" className="h-10 w-10 text-white/50" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M24 8c2 9-9 13-9 21a9 9 0 0 0 18 0c0-4-2.4-6.4-4.4-8.8-.6 2.2-1.8 3.6-3.4 4.4-1-5.6 3.4-9.6-1.2-16.6Z" />
        </svg>
      </div>
    );
  }

  return (
    <figure className={`m-0 ${className}`}>
      <img
        src={image.src}
        alt={image.alt}
        loading={loading}
        decoding="async"
        onError={() => setFailed(true)}
        className={`photo h-full w-full object-cover ${imgClassName}`}
      />
    </figure>
  );
}

export function ImageCredit({ image }: { image: ImageRef }) {
  if (!image.credit) return null;
  return (
    <figcaption className="mt-1.5 text-xs text-slate-400">
      Фото:{' '}
      {image.creditUrl ? (
        <a href={image.creditUrl} target="_blank" rel="noreferrer" className="underline decoration-slate-300 hover:text-gp-700">
          {image.credit}
        </a>
      ) : (
        image.credit
      )}
    </figcaption>
  );
}
