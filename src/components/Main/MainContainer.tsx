'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setCoords } from '@/redux/slices/mapSlice';
import { setPs } from '@/redux/slices/psSlice';
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

const defaultCoords = { latitude: 37.5760222, longitude: 126.9769 };

const MainContainer = ({ brands }: MainContainerProps) => {
  const dispatch = useAppDispatch();
  const { coords: coordsState, map } = useAppSelector(state => state.map);
  const { ps } = useAppSelector(state => state.ps);
  const { isOpen, content } = useAppSelector(state => state.toast);
  const { distance, keywords } = useAppSelector(state => state.filter);

  const { coords, error } = useCurrentLocation();
  const { user, isUserLoading } = useUser();

  const [cafes, setCafes] = useState<PlaceType[]>([]);
  const [isCafesLoading, setIsCafesLoading] = useState(false);
  const [isSearchReady, setIsSearchReady] = useState(false);
  const [page, setPage] = useState(1);
  const [isObserverLoading, setIsObserverLoading] = useState(false);

  useEffect(() => {
    setPage(1);
  }, [keywords]);

  useEffect(() => {
    if (keywords[0] === '모든 카페') {
      setPage(1);
      setIsObserverLoading(true);
    }
  }, [distance, coordsState, keywords]);

  useEffect(() => {
    // 키워드 검색 및 카페 오버레이를 표시하기 위한 검색 객체와 지도, 유저 정보를 대기합니다.
    if (!isUserLoading && ps && map) {
      setIsSearchReady(true);
    }
  }, [isUserLoading, ps, map]);

  useEffect(() => {
    // getCurrentPosition 실패 시 defaultCoords로 위치 설정
    if (!error) return;
    dispatch(setCoords(defaultCoords));
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
        setIsCafesLoading={setIsCafesLoading}
        isSearchReady={isSearchReady}
        page={page}
        setIsObserverLoading={setIsObserverLoading}
      />
      <CafeSideBar
        brands={brands}
        cafes={cafes}
        isCafesLoading={isCafesLoading}
        setPage={setPage}
        isObserverLoading={isObserverLoading}
      />
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
