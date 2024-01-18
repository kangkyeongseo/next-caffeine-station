'use client';
import { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    kakao: any;
  }
}

export default function Home() {
  const mapRef = useRef<HTMLDivElement>(null);
  const [map, setMap] = useState<any>(null);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(37.639888, 126.791622), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      setMap(new window.kakao.maps.Map(mapRef.current, options));
    });
  }, []);

  return <div ref={mapRef} className='h-96 w-96'></div>;
}
