'use client';
import { useEffect, useRef, useState } from 'react';

import { setMap } from '@/redux/slices/mapSlice';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import { useAppDispatch } from '@/redux/store';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { coords, error } = useCurrentLocation();

  useEffect(() => {
    if (!coords) return;
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(coords.latitude, coords.longitude), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      dispatch(setMap(newMap));
    });
  }, [coords]);

  return (
    <>
      <div ref={mapRef} className='h-96 w-96'></div>
    </>
  );
};

export default Map;
