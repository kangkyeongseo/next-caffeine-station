'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setCoords } from '@/redux/slices/mapSlice';
import { BrandType, CafeType } from '@/types';
import FilteringController from './FilteringController';
import Map from './Map';
import CafeSideBar from './CafeSideBar/CafeSideBar';
import SetMapButtons from './SetMapButtons';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import MapContainer from './Map/MapContainer';

declare global {
  interface Window {
    kakao: any;
  }
}

interface MainContainerProps {
  brands: BrandType[];
}

const MainContainer = ({ brands }: MainContainerProps) => {
  const dispatch = useAppDispatch();
  const { coords, error } = useCurrentLocation();

  const [ps, setPs] = useState<any>(null);
  const [cafes, setCafes] = useState<CafeType[]>([]);

  useEffect(() => {
    dispatch(setCoords(coords));
  }, [coords]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      setPs(new window.kakao.maps.services.Places());
    });
  }, []);

  return (
    <div className='relative h-full w-screen overflow-hidden md:h-screen'>
      <FilteringController ps={ps} />
      <MapContainer ps={ps} brands={brands} cafes={cafes} setCafes={setCafes} />
      {/* <Map ps={ps} brands={brands} cafes={cafes} setCafes={setCafes} /> */}
      <CafeSideBar brands={brands} cafes={cafes} />
      <SetMapButtons />
    </div>
  );
};

export default MainContainer;
