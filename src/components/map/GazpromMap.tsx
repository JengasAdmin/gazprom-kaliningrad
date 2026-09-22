import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import type { MapObject, MapCategory } from '../../data/types';

export const CATEGORY_META: Record<MapCategory, { label: string; color: string; icon: string }> = {
  storage: { label: 'Газохранилища', color: '#0A4066', icon: 'M24 44 10 26c-4-6-3-14 2-18a12 12 0 0 1 16 2c5-4 12-4 16 1s4 12 0 17L24 44Z' },
  pipeline: { label: 'Газопроводы и ГРС', color: '#0079C2', icon: 'M24 44 10 26c-4-6-3-14 2-18a12 12 0 0 1 16 2c5-4 12-4 16 1s4 12 0 17L24 44Z' },
  gasification: { label: 'Газификация и ГМТ', color: '#1B8DCB', icon: 'M24 44 10 26c-4-6-3-14 2-18a12 12 0 0 1 16 2c5-4 12-4 16 1s4 12 0 17L24 44Z' },
  admin: { label: 'Административные', color: '#475569', icon: 'M24 44 10 26c-4-6-3-14 2-18a12 12 0 0 1 16 2c5-4 12-4 16 1s4 12 0 17L24 44Z' },
  social: { label: 'Социальные объекты', color: '#059669', icon: 'M24 44 10 26c-4-6-3-14 2-18a12 12 0 0 1 16 2c5-4 12-4 16 1s4 12 0 17L24 44Z' },
  production: { label: 'Производственные', color: '#B45309', icon: 'M24 44 10 26c-4-6-3-14 2-18a12 12 0 0 1 16 2c5-4 12-4 16 1s4 12 0 17L24 44Z' },
};

function markerIcon(category: MapCategory, active: boolean) {
  const color = CATEGORY_META[category].color;
  return L.divIcon({
    className: '',
    html: `<span class="gp-marker" style="background:${color};${active ? 'width:38px;height:38px;box-shadow:0 0 0 6px rgba(0,121,194,.25),0 2px 6px rgba(7,43,71,.45);' : ''}">
      <svg viewBox="0 0 24 24" fill="#fff"><path d="M12 2a7.5 7.5 0 0 0-7.5 7.5c0 5.6 6.4 11.6 6.9 12.1a.9.9 0 0 0 1.2 0c.5-.5 6.9-6.5 6.9-12.1A7.5 7.5 0 0 0 12 2Zm0 10.2a2.7 2.7 0 1 1 0-5.4 2.7 2.7 0 0 1 0 5.4Z"/></svg>
    </span>`,
    iconSize: active ? [38, 38] : [30, 30],
    iconAnchor: active ? [19, 19] : [15, 15],
    popupAnchor: [0, -16],
  });
}

interface GazpromMapProps {
  objects: MapObject[];
  activeId?: string | null;
  /** Изменение ключа перерисовывает карту (например, при смене фильтров) */
  fitKey?: string;
  className?: string;
  interactiveList?: boolean;
  onActiveChange?: (id: string) => void;
  initialZoom?: number;
  center?: [number, number];
}

const REGION_BOUNDS = L.latLngBounds([54.25, 19.35], [55.4, 23.0]);

export function GazpromMap({
  objects,
  activeId,
  fitKey,
  className = 'h-[520px]',
  onActiveChange,
  center = [54.86, 20.75],
  initialZoom = 8,
}: GazpromMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const activeRef = useRef<string | null | undefined>(activeId);
  const navigate = useNavigate();

  activeRef.current = activeId;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = L.map(containerRef.current, {
      center,
      zoom: initialZoom,
      scrollWheelZoom: false,
      zoomControl: true,
      attributionControl: true,
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);
    map.fitBounds(REGION_BOUNDS, { padding: [24, 24] });
    // SPA-навигация для ссылок во всплывающих окнах
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a');
      if (a && a.getAttribute('href')?.startsWith('/')) {
        e.preventDefault();
        navigate(a.getAttribute('href')!);
      }
    };
    map.getContainer().addEventListener('click', onClick);
    mapRef.current = map;
    return () => {
      map.getContainer().removeEventListener('click', onClick);
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    const markers = markersRef.current;

    const ids = new Set(objects.map((o) => o.id));
    for (const [id, marker] of markers) {
      if (!ids.has(id)) {
        marker.remove();
        markers.delete(id);
      }
    }

    for (const o of objects) {
      if (markers.has(o.id)) continue;
      const marker = L.marker(o.coords, {
        icon: markerIcon(o.mapCategory, o.id === activeRef.current),
        title: o.name,
        alt: o.name,
      });
      marker.bindPopup(
        `<div class="p-3">
          ${o.image ? `<img src="${o.image.src}" alt="${o.image.alt}" style="width:100%;height:110px;object-fit:cover;border-radius:6px 6px 0 0;margin:0 0 8px" onerror="this.style.display='none'"/>` : ''}
          <strong style="display:block;font-size:13px;line-height:1.35;margin-bottom:4px">${o.name}</strong>
          <span style="display:block;font-size:12px;line-height:1.45;color:#475569">${o.short}</span>
          ${o.facilitySlug ? `<a href="/facilities/${o.facilitySlug}" style="display:inline-block;margin-top:8px;font-size:12px;font-weight:600;color:#006199">Страница объекта →</a>` : o.link ? `<a href="${o.link}" style="display:inline-block;margin-top:8px;font-size:12px;font-weight:600;color:#006199">Подробнее →</a>` : ''}
        </div>`,
        { className: 'gp-popup', closeButton: true, minWidth: 240, maxWidth: 260 },
      );
      marker.on('click', () => onActiveChange?.(o.id));
      marker.addTo(map);
      markers.set(o.id, marker);
    }
  }, [objects, onActiveChange]);

  useEffect(() => {
    for (const [id, marker] of markersRef.current) {
      const o = objects.find((x) => x.id === id);
      if (o) marker.setIcon(markerIcon(o.mapCategory, id === activeId));
    }
  }, [activeId, objects]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !fitKey) return;
    if (objects.length === 1) {
      map.setView(objects[0].coords, 11);
    } else {
      map.fitBounds(L.latLngBounds(objects.map((o) => o.coords)), { padding: [40, 40], maxZoom: 10 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fitKey]);

  /** Публичный метод: подсветить объект (используется списком рядом с картой). */
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !activeId) return;
    const marker = markersRef.current.get(activeId);
    if (marker) {
      map.flyTo(marker.getLatLng(), Math.max(map.getZoom(), 10), { duration: 0.6 });
      marker.openPopup();
    }
  }, [activeId]);

  return <div ref={containerRef} className={`${className} w-full`} role="application" aria-label="Карта объектов Газпрома в Калининградской области" />;
}
