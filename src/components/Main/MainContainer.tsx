'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCoords } from '@/redux/slices/mapSlice';
import { setPs } from '@/redux/slices/psSlice';
import { setContent, setIsOpen } from '@/redux/slices/toastSlice';
import { BrandType, PlaceType, KakaoType } from '@/types';
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
  const { map } = useAppSelector(state => state.map);
  const { ps } = useAppSelector(state => state.ps);
  const { isOpen, content } = useAppSelector(state => state.toast);

  const { coords, error } = useCurrentLocation();
  const { user, isUserLoading } = useUser();

  const [cafes, setCafes] = useState<PlaceType[]>([]);
  const [isSearchReady, setIsSearchReady] = useState(false);

  useEffect(() => {
    // 키워드 검색 및 카페 오버레이를 표시하기 위한 검색 객체와 지도, 유저 정보를 대기합니다.
    if (!isUserLoading && ps && map) {
      setIsSearchReady(true);
    }
  }, [isUserLoading, ps, map]);

  useEffect(() => {
    // getCurrentPosition 실패 시 토스트 메시지 생성
    if (!error) return;
    dispatch(setIsOpen(true));
    dispatch(setContent('위치 검색에 실패했습니다.'));
    const timer = setTimeout(() => {
      dispatch(setIsOpen(false));
      dispatch(setContent(''));
    }, 5000);
    return () => clearTimeout(timer);
  }, [error, dispatch]);

  useEffect(() => {
    // getCurrentPosition으로 부터 전달받은 위치 정보 전역 객체로 저장
    if (coords) {
      dispatch(setCoords(coords));
    }
  }, [coords, dispatch]);

  useEffect(() => {
    // 카카오 검색 객체 생성 및 전역 객체로 저장
    window.kakao.maps.load(() => {
      const ps = new window.kakao.maps.services.Places();
      dispatch(setPs(ps));
    });
  }, [dispatch]);

  return (
    <div className='relative h-dvh w-screen overflow-hidden'>
      <FilteringController ps={ps} user={user} isUserLoading={isUserLoading} />
      <MapContainer
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
