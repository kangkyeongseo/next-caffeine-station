import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setContent, setIsOpen } from '@/redux/slices/toastSlice';
import { setIsMapLoading } from '@/redux/slices/mapSlice';
import { PlaceType } from '@/types';
import useSearchPlace from '@/hooks/useSearchPlace';

interface SearchManagerProps {
  setCafes: React.Dispatch<React.SetStateAction<PlaceType[]>>;
  setIsCafesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchReady: boolean;
  page: number;
  setIsObserverLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchManager = ({
  setCafes,
  setIsCafesLoading,
  isSearchReady,
  page,
  setIsObserverLoading,
}: SearchManagerProps) => {
  const dispatch = useAppDispatch();
  const { coords } = useAppSelector(state => state.map);
  const { distance, keywords } = useAppSelector(state => state.filter);

  const option = useMemo(() => {
    if (!isSearchReady || !coords) return null;
    return {
      location: new window.kakao.maps.LatLng(coords.latitude, coords.longitude),
      radius: distance,
    };
  }, [isSearchReady, coords, distance]);

  const { places, isPlacesLoading } = useSearchPlace({
    keyword: keywords,
    option,
    page,
    setIsObserverLoading,
  });

  useEffect(() => {
    // 키워드 및 옵션 변경 시 지도 로딩과 토스트 메세지를 설정합니다.
    if (!isSearchReady) return;
    dispatch(setIsMapLoading(true));
    dispatch(setIsOpen(false));
    dispatch(setContent(''));
  }, [isSearchReady, keywords, distance, coords, dispatch]);

  useEffect(() => {
    setCafes(places);
    setIsCafesLoading(isPlacesLoading);
  }, [places, isPlacesLoading, setCafes, setIsCafesLoading]);

  return null;
};

export default SearchManager;
