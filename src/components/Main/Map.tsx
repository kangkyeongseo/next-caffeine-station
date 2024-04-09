'use client';
import { useEffect, useRef, useState } from 'react';
import { setCoords, setMap } from '@/redux/slices/mapSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { CoordsType } from '@/types';
import MapLoading from '@/components/MapLoading';
import useCurrentLocation from '@/hooks/useCurrentLocation';

declare global {
  interface Window {
    kakao: any;
  }
}

const Map = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const {
    map,
    coords: coordsState,
    isMapLoading,
  } = useAppSelector(state => state.map);
  const { coords, error } = useCurrentLocation();

  useEffect(() => {
    dispatch(setCoords(coords));
  }, [coords]);

  useEffect(() => {
    if (!coordsState) return;
    if (!map) {
      window.kakao.maps.load(() => {
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(
            coordsState.latitude,
            coordsState.longitude,
          ), //지도의 중심좌표.
          level: 2, //지도의 레벨(확대, 축소 정도)
        };
        const newMap = new window.kakao.maps.Map(mapRef.current, options);
        dispatch(setMap(newMap));
      });
    }
  }, [coordsState]);

  return (
    <div className='relative flex items-center justify-center'>
      {isMapLoading && <MapLoading />}
      <div
        ref={mapRef}
        className={`aspect-square w-full md:h-screen md:w-screen`}
      ></div>
    </div>
  );
};

export default Map;
