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
  const [ps, setPs] = useState<any>(null);

  const placesSearchCB = (data, status, pagination) => {
    if (status === window.kakao.maps.services.Status.OK) {
      const bounds = new window.kakao.maps.LatLngBounds();
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    } else {
      console.log('검색 실패', window.kakao.maps.services.Status);
    }
  };

  const displayMarker = place => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  };

  const keywordsSearch = (keywords: string[]) => {
    keywords.map(keyword => {
      ps.keywordSearch(keyword, placesSearchCB, {
        useMapCenter: true,
        radius: 3000,
      });
    });
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(37.639888, 126.791622), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };

      setMap(new window.kakao.maps.Map(mapRef.current, options));
      setPs(new window.kakao.maps.services.Places());
    });
  }, []);

  useEffect(() => {
    if (!map) return;
    if (!ps) return;
    ps.setMap(map);
    keywordsSearch(['뺵다방', '메가커피', '컴포즈커피']);
  }, [map, ps]);

  return <div ref={mapRef} className='h-96 w-96'></div>;
}
