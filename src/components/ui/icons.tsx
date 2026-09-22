import type { SVGProps } from 'react';

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
};

export const SearchIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export const MenuIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const CloseIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const EyeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export const ChevronRightIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

export const ChevronDownIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const ArrowRightIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12h16m0 0-6-6m6 6-6 6" />
  </svg>
);

export const MapPinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const FlameIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3c1 4.5-4.5 6.5-4.5 11a4.5 4.5 0 0 0 9 0c0-2-1.2-3.2-2.2-4.4-.3 1.1-.9 1.8-1.7 2.2-.5-2.8 1.7-4.8-.6-8.8Z" />
    <path d="M12 21a6.5 6.5 0 0 1-6.5-6.5c0-2.2 1-4 2.2-5.6" opacity=".5" />
  </svg>
);

export const PipeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 9h10a4 4 0 0 1 4 4v8" />
    <path d="M3 5h10a8 8 0 0 1 8 8v8" />
  </svg>
);

export const StorageIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 20V10l7-5 7 5v10" />
    <path d="M3 20h18" />
    <path d="M9 20v-5h6v5" />
  </svg>
);

export const GasificationIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M7 21V9a4 4 0 0 1 4-4h6" />
    <path d="M14 2h3v6h-3z" />
    <circle cx="7" cy="19" r="2" />
  </svg>
);

export const PeopleIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M2.5 20c0-3.6 2.9-6 6.5-6s6.5 2.4 6.5 6" />
    <path d="M16.5 5.2a3.5 3.5 0 0 1 0 6.4M18 14.3c2.1.7 3.5 2.4 3.5 4.9" />
  </svg>
);

export const StructureIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="9" y="3" width="6" height="4" rx="1" />
    <rect x="2" y="17" width="6" height="4" rx="1" />
    <rect x="16" y="17" width="6" height="4" rx="1" />
    <path d="M12 7v5M5 17v-3h14v3" />
  </svg>
);

export const LeafIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 20c8 0 14-6 16-16-8 0-14 4-14 11 0 1.8.4 3.4 1 4.8" />
    <path d="M4 20c2-6 6-9 10-11" />
  </svg>
);

export const CalendarIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M3 10h18M8 3v4m8-4v4" />
  </svg>
);

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...base} {...p}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
  </svg>
);

export const WarningIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3 2.5 20h19L12 3Z" />
    <path d="M12 10v4m0 3v.01" />
  </svg>
);

export const ExternalLinkIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M14 4h6v6M20 4l-9 9" />
    <path d="M19 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h5" />
  </svg>
);
