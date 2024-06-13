import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://caffeine-station.vercel.app', lastModified: new Date() },
  ];
}
