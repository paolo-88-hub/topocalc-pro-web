import React from 'react';

export type IconName =
  | 'home' | 'calc' | 'pin' | 'file' | 'user'
  | 'road' | 'map' | 'crane' | 'pick' | 'globe' | 'grid'
  | 'slope' | 'compass' | 'ruler' | 'car' | 'area' | 'level'
  | 'robot' | 'chevron' | 'gps' | 'refresh' | 'save' | 'trash'
  | 'cloud' | 'wifi-off' | 'info' | 'flag' | 'download' | 'share'
  | 'pdf' | 'csv' | 'xls' | 'dxf' | 'kml' | 'shp' | 'play' | 'check'
  | 'back' | 'plus' | 'point';

const paths: Record<IconName, React.ReactNode> = {
  home: <path d="M4 11.5 12 4l8 7.5M6 10v9h5v-5h2v5h5v-9" />,
  calc: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h.01M12 11h.01M16 11h.01M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01M16 17h.01" />
    </>
  ),
  pin: <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  file: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.4" />
      <path d="M5 20c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5" />
    </>
  ),
  road: <path d="M9 3 5 21M15 3l4 18M12 6v2M12 11v2M12 16v2" />,
  map: (
    <>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  crane: <path d="M4 21h9M6 21V9l10-5v5M16 4v6M16 10l4 3M9 9v3M9 21v-9" />,
  pick: <path d="M5 19 15 9M9 3c3 1 6 4 7 7l-3 3c-3-1-6-4-7-7l3-3ZM3 21l3-3" />,
  globe: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  slope: <path d="M3 20h18M3 20 15 6l3 4M15 6h4v4" />,
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  ruler: <path d="m4 15 5-5 3 3 8-8M12 4h5v5M8 20l-4-4 12-12 4 4Z" />,
  car: (
    <>
      <path d="M4 16V11l2.2-4.4A2 2 0 0 1 8 5.5h8a2 2 0 0 1 1.8 1.1L20 11v5" />
      <path d="M4 16h16v2a1 1 0 0 1-1 1h-1.5a1 1 0 0 1-1-1v-1h-9v1a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2Z" />
      <circle cx="7.5" cy="16" r="1.4" />
      <circle cx="16.5" cy="16" r="1.4" />
    </>
  ),
  area: (
    <>
      <path d="M4 6h10l6 6v6H4Z" />
      <path d="M4 6v12" />
    </>
  ),
  level: <path d="M3 12h4l2-6 4 12 2-6h6" />,
  robot: (
    <>
      <rect x="5" y="8" width="14" height="11" rx="2" />
      <path d="M12 4v4M9 3.4a1 1 0 1 0 0 .01M9 12.5v2M15 12.5v2" />
      <path d="M2 12h3M19 12h3" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  gps: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
    </>
  ),
  refresh: <path d="M4 4v5h5M20 20v-5h-5M4.6 15a8 8 0 0 0 13.8 3M19.4 9A8 8 0 0 0 5.6 6" />,
  save: (
    <>
      <path d="M5 4h11l3 3v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Z" />
      <path d="M8 4v6h8V4M8 14h8v6H8Z" />
    </>
  ),
  trash: <path d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-9 0 1 13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l1-13" />,
  cloud: <path d="M7 18a4.5 4.5 0 0 1-.5-8.97A5.5 5.5 0 0 1 17.4 8 4 4 0 0 1 17 18H7Z" />,
  'wifi-off': <path d="m2 2 20 20M8.5 16.5a5 5 0 0 1 6.6-.4M5 12.5a10 10 0 0 1 3.2-2M19 12.5a10 10 0 0 0-2.7-2.1M12 20h.01" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 8v.01" />
    </>
  ),
  flag: <path d="M5 21V4M5 5h13l-3 4 3 4H5" />,
  download: <path d="M12 3v12m0 0-4-4m4 4 4-4M4 19h16" />,
  share: (
    <>
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="17" cy="6" r="2.3" />
      <circle cx="17" cy="18" r="2.3" />
      <path d="m8 10.8 7-3.6M8 13.2l7 3.6" />
    </>
  ),
  pdf: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M9 17v-4h1.3a1.3 1.3 0 1 1 0 2.6H9M13 13v4h1a2 2 0 0 0 0-4h-1ZM17 13v4M17 15h1.5" />
    </>
  ),
  csv: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M9.5 14a1.5 1.5 0 0 0-1.5 1.5v1A1.5 1.5 0 0 0 9.5 18M12 14v4M13.6 14l1.4 4 1.4-4" />
    </>
  ),
  xls: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="m9 14 3 4m0-4-3 4M15 14v4h2" />
    </>
  ),
  dxf: (
    <>
      <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Z" />
      <path d="M14 3v5h5" />
      <path d="M8 17v-4h2.2a1.3 1.3 0 1 1 0 2.6H8M13 13h2.2a1.3 1.3 0 1 1 0 2.6H13m0 0 2.4 1.4" />
    </>
  ),
  kml: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 3v18M3 12h18" />
    </>
  ),
  shp: (
    <>
      <path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z" />
      <path d="M9 4v14M15 6v14" />
    </>
  ),
  play: <path d="M7 4.5v15l13-7.5-13-7.5Z" />,
  check: <path d="m4 12.5 5.5 5.5L20 7" />,
  back: <path d="M15 5 8 12l7 7" />,
  plus: <path d="M12 5v14M5 12h14" />,
  point: (
    <>
      <circle cx="12" cy="9" r="2.6" />
      <path d="M12 21s6.5-5.7 6.5-11a6.5 6.5 0 1 0-13 0C5.5 15.3 12 21 12 21Z" />
    </>
  ),
};

export function Icon({
  name,
  size = 18,
  strokeWidth = 1.8,
  className = '',
  style,
}: {
  name: IconName;
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
