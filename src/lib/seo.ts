import { useEffect } from 'react';

/**
 * Base URL used for canonical links, Open Graph and sitemap.
 * TODO: replace with the real production domain before deployment.
 */
export const SITE_URL = 'https://kaliningrad-gazprom.example';

export interface SEOInput {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Запретить индексацию (для демо/служебных страниц) */
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, path = '/', type = 'website', image, jsonLd, noindex }: SEOInput) {
  useEffect(() => {
    const canonicalUrl = `${SITE_URL}${path}`;
    document.title = title;
    upsertMeta('name', 'description', description);
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, nofollow');
    } else {
      document.head.querySelector<HTMLMetaElement>('meta[name="robots"]')?.remove();
    }
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:type', type);
    upsertMeta('property', 'og:url', canonicalUrl);
    upsertMeta('property', 'og:site_name', 'Газпром — Калининградская область');
    upsertMeta('property', 'og:locale', 'ru_RU');
    if (image) upsertMeta('property', 'og:image', image.startsWith('http') ? image : `${SITE_URL}${image}`);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset.seoJsonld = 'true';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) script.remove();
    };
  }, [title, description, path, type, image, JSON.stringify(jsonLd)]);
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Газпром — Калининградская область',
    description:
      'Региональный информационный ресурс о деятельности ПАО «Газпром» в Калининградской области',
    url: SITE_URL,
    parentOrganization: {
      '@type': 'Organization',
      name: 'ПАО «Газпром»',
      url: 'https://www.gazprom.ru',
    },
  };
}

export function newsJsonLd(input: {
  title: string;
  description: string;
  datePublished: string;
  path: string;
  image?: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: input.title,
    description: input.description,
    datePublished: input.datePublished,
    url: `${SITE_URL}${input.path}`,
    ...(input.image ? { image: input.image.startsWith('http') ? input.image : `${SITE_URL}${input.image}` } : {}),
    publisher: {
      '@type': 'Organization',
      name: 'Газпром — Калининградская область',
    },
  };
}
