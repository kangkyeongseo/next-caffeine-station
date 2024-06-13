import { Metadata } from 'next';

export const rootMetadata: Metadata = {
  metadataBase: new URL('https://caffeine-station.vercel.app'),
  title: {
    default: '카페인스테이션',
    template: `%sb | 카페인스테이션`,
  },
  description: '내 주변 카페 찾기 서비스, 카페인스테이션',
  keywords: ['카페인', '카페', '주변카페', '저가카페', '프렌차이즈카페'],
  openGraph: {
    title: {
      default: '카페인스테이션',
      template: `%sb | 카페인스테이션`,
    },
    description: '내 주변 카페 찾기 서비스, 카페인스테이션',
    images: '/images/og-image.png',
    url: 'https://caffeine-station.vercel.app',
    type: 'website',
  },
  icons: {
    icon: '/images/favicon.png',
  },
};
