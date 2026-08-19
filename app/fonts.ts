import { Bebas_Neue, Cormorant_Garamond } from 'next/font/google';

export const heroDisplay = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
});

export const heroItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic'],
  display: 'swap',
});
