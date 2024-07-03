'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCoords } from '@/redux/slices/mapSlice';
import { setPs } from '@/redux/slices/psSlice';
import { setContent, setIsOpen } from '@/redux/slices/toastSlice';
import { BrandType, CafeType, KakaoType } from '@/types';
import FilteringController from './FilteringController';
import CafeSideBar from './CafeSideBar/CafeSideBar';
import SetMapButtons from './SetMapButtons';
import useCurrentLocation from '@/hooks/useCurrentLocation';
import MapContainer from './Map/MapContainer';
import useUser from '@/hooks/useUser';

declare global {
  interface Window {
    kakao: KakaoType;
  }
}

interface MainContainerProps {
  brands: BrandType[];
}

const MainContainer = ({ brands }: MainContainerProps) => {
  const dispatch = useAppDispatch();
  const { isOpen, content } = useAppSelector(state => state.toast);
  const { ps } = useAppSelector(state => state.ps);

  const { coords, error } = useCurrentLocation();
  const { user, isUserLoading } = useUser();

  const [cafes, setCafes] = useState<CafeType[]>([]);
  const [isSearchReady, setIsSearchReady] = useState(false);

  useEffect(() => {
    if (isUserLoading) return;
    const timer = setTimeout(() => {
      setIsSearchReady(true);
    }, 500);
    return () => clearTimeout(timer);
  }, [isUserLoading, user]);

  useEffect(() => {
    if (!error) return;
    dispatch(setIsOpen(true));
    dispatch(setContent('위치 검색에 실패했습니다.'));
    const timer = setTimeout(() => {
      dispatch(setIsOpen(false));
      dispatch(setContent(''));
    }, 5000);
    return () => clearTimeout(timer);
  }, [error]);

  useEffect(() => {
    dispatch(setCoords(coords));
  }, [coords]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      const ps = new window.kakao.maps.services.Places();
      dispatch(setPs(ps));
    });
  }, []);

  return (
    <div className='relative h-dvh w-screen overflow-hidden'>
      <FilteringController ps={ps} user={user} isUserLoading={isUserLoading} />
      <MapContainer
        ps={ps}
        brands={brands}
        cafes={cafes}
        setCafes={setCafes}
        isSearchReady={isSearchReady}
      />
      <CafeSideBar brands={brands} cafes={cafes} />
      <SetMapButtons />
      {isOpen && (
        <div className='fixed left-1/2 top-4 z-30 w-72 translate-x-[-50%] translate-y-[-100px] animate-toast rounded-full bg-white text-center shadow-lg'>
          {content}
        </div>
      )}
    </div>
  );
};

export default MainContainer;
