import type { Metadata } from 'next';
import localfont from 'next/font/local';
import Script from 'next/script';
import Provider from '@/components/Provider';
import { rootMetadata } from '@/constants/metadatas';
import './globals.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';

const pretendard = localfont({
  src: '../../public/fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = rootMetadata;

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, 'brand'));
  const brands = querySnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as BrandType;
  });

  return brands.map(brand => ({
    id: brand.id,
  }));
}

export default function RootLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={pretendard.className}>
        <Script
          strategy='beforeInteractive'
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&autoload=false&libraries=services`}
        ></Script>
        <Provider>
          {children}
          {modal}
        </Provider>
      </body>
    </html>
  );
}
