'use client';
import { useEffect, useRef } from 'react';
import { setMap } from '@/redux/slices/mapSlice';
import { useAppDispatch } from '@/redux/store';
import { CoordsType } from '@/types';

interface MapProps {
  coords: CoordsType | null;
}

const Map = ({ coords }: MapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);

  const displayCurrentMarker = (map: any, coords: CoordsType) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
    });
  };

  useEffect(() => {
    if (!coords) return;
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude), //지도의 중심좌표.
        level: 2, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      displayCurrentMarker(newMap, coords);
    });
  }, [coords]);

  return (
    <>
      <div ref={mapRef} className='aspect-video w-[500px]'></div>
    </>
  );
};

export default Map;
