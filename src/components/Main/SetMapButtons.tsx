'use client';
import React from 'react';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import { setCoords } from '@/redux/slices/mapSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';

const SetMapButtons = () => {
  const dispatch = useAppDispatch();
  const { coords } = useCurrentLocation();

  const { map } = useAppSelector(state => state.map);

  const onMapPositionClick = () => {
    const mapPosition = map.getCenter();
    dispatch(
      setCoords({ latitude: mapPosition.Ma, longitude: mapPosition.La }),
    );
  };

  const onCurrentPositionClick = () => {
    const moveLatLon = new window.kakao.maps.LatLng(
      coords?.latitude,
      coords?.longitude,
    );
    dispatch(setCoords(coords));
    map.setCenter(moveLatLon);
  };

  return (
    <div className='absolute left-3 top-[100px] z-10 flex flex-col gap-2 text-xs text-white lg:left-[350px] lg:top-5'>
      <button
        className='rounded-md bg-emerald-600 px-2 py-1 hover:bg-emerald-700 lg:px-4'
        onClick={onMapPositionClick}
      >
        이 지역 재검색
      </button>
      <button
        className='rounded-md bg-black/70 px-2 py-1 hover:bg-black/90 lg:px-4'
        onClick={onCurrentPositionClick}
      >
        나의 위치 검색
      </button>
    </div>
  );
};

export default SetMapButtons;
