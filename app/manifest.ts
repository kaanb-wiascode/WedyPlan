import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'WedyPlan — Akıllı Düğün Pazaryeri & WOS',
    short_name: 'WedyPlan',
    description: 'Yapay Zeka Destekli Düğün Planlama ve İşletim Sistemi',
    start_url: '/',
    display: 'standalone',
    background_color: '#FDFBFD',
    theme_color: '#0071e3',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}