/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0C2340',
        primaryDeep: '#081729',
        surface: '#FFFFFF',
        background: '#F4F5F7',
        border: '#E0E4EA',
        accent: '#1A7F5A',
        accentDark: '#145F44',
        accentLight: '#E4F3EC',
        warning: '#EF9F27',
        warningLight: '#FCF0DC',
        danger: '#C23B3B',
        dangerLight: '#F8E4E4',
        info: '#378ADD',
        infoLight: '#E4EFFA',
        purple: '#7F77DD',
        purpleLight: '#EBE9FB',
        coral: '#E24B4A',
        textPrimary: '#0D1B2A',
        textSecondary: '#64748B',
        textMuted: '#94A3B8',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(12,35,64,0.06), 0 1px 1px rgba(12,35,64,0.04)',
      },
    },
  },
  plugins: [],
};
