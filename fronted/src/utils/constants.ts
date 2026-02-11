export const CASABLANCA_NEIGHBORHOODS = [
  'Ain Chock',
  'Ain Sebaa',
  'Al Fida',
  'Anfa',
  'Belvédère',
  'Bernoussi',
  'Bourgogne',
  'Casa-Anfa',
  'Centre-ville',
  'Derb Ghallef',
  'Hay Hassani',
  'Hay Mohammadi',
  'La Gironde',
  'Lissasfa',
  'Maarif',
  'Masbah',
  'Moulay Rachid',
  'Oasis',
  'Oulfa',
  'Racine',
  'Roches Noires',
  'Salmia',
  'Sbata',
  'Sidi Belyout',
  'Sidi Bernoussi',
  'Sidi Maarouf',
  'Sidi Moumen'
] as const;

export type CasablancaNeighborhood = typeof CASABLANCA_NEIGHBORHOODS[number];

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';