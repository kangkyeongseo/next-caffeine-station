'use client';
import { useEffect, useRef, useState } from 'react';
import { setMap } from '@/redux/slices/mapSlice';
import { useAppDispatch } from '@/redux/store';
import { CoordsType } from '@/types';
import Loading from '@/app/loading';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MapProps {
  coords: CoordsType | null;
}

const Map = ({ coords }: MapProps) => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      displayCurrentMarker(newMap, coords);
      dispatch(setMap(newMap));
      setIsLoading(false);
    });
  }, [coords]);

  return (
    <div className='relative flex items-center justify-center'>
      {isLoading && <Loading />}
      <div ref={mapRef} className={`h-screen w-screen`}></div>
    </div>
  );
};

export default Map;
