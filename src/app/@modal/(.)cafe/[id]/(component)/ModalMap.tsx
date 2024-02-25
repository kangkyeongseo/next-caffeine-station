'use client';
import { useEffect, useRef, useState } from 'react';
import { CafeType, CoordsType } from '@/types';
import { useSearchParams } from 'next/navigation';

const ModalMap = () => {
  const params = useSearchParams();
  const cafeName = params.get('name');
  // const latitude = Number(params.get('lat'));
  // const longitude = Number(params.get('lon'));

  const mapRef = useRef<HTMLDivElement>(null);

  const [cafe, setCafe] = useState<CafeType | null>(null);

  const displayCurrentMarker = (map: any, coords: CoordsType) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
    });
  };

  useEffect(() => {
    if (!cafe) return;
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(cafe.y, cafe.x), //지도의 중심좌표.
        level: 2, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      displayCurrentMarker(newMap, {
        latitude: Number(cafe.y),
        longitude: Number(cafe.x),
      });
    });
  }, [cafe]);

  useEffect(() => {
    if (!cafeName) return;
    const places = new window.kakao.maps.services.Places();

    const callback = function (result: CafeType[], status: string) {
      if (status === window.kakao.maps.services.Status.OK) {
        setCafe(result[0]);
      }
    };

    places.keywordSearch(cafeName, callback);
  }, [cafeName]);

  return (
    <>
      <div ref={mapRef} className='aspect-video w-[500px]'></div>
    </>
  );
};

export default ModalMap;
