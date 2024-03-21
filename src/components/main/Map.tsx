'use client';
import { useEffect, useRef, useState } from 'react';
import { setCoords, setMap } from '@/redux/slices/mapSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CoordsType } from '@/types';
import Loading from '@/app/loading';
import useCurrentLocation from '@/hooks/useCurrentLocation';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, coords: coordsState } = useAppSelector(state => state.map);
  const { coords, error } = useCurrentLocation();
  const [isLoading, setIsLoading] = useState(true);

  const displayCurrentMarker = (map: any, coords: CoordsType) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
    });
  };

  useEffect(() => {
    dispatch(setCoords(coords));
  }, [coords]);

  useEffect(() => {
    if (!coordsState) return;
    window.kakao.maps.load(() => {
      const options = {
        //지도를 생성할 때 필요한 기본 옵션
        center: new window.kakao.maps.LatLng(
          coordsState.latitude,
          coordsState.longitude,
        ), //지도의 중심좌표.
        level: 3, //지도의 레벨(확대, 축소 정도)
      };
      const newMap = new window.kakao.maps.Map(mapRef.current, options);
      displayCurrentMarker(newMap, coordsState);
      dispatch(setMap(newMap));
      setIsLoading(false);
    });
  }, [coordsState]);

  return (
    <div className='relative flex items-center justify-center'>
      {isLoading && <Loading />}
      <div ref={mapRef} className={`h-screen w-screen`}></div>
    </div>
  );
};

export default Map;
