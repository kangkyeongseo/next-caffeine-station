'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setDistance,
  setIsHot,
  setKeywords,
  setMode,
} from '@/redux/slices/filterSlice';
import { setUserKeyword } from '@/redux/slices/userKeywordSlice';
import SearchFilter from './SearchFilter';
import DistanceFilter from './DistanceFilter';
import KeywordsFilter from './KeywordsFilter';
import ModeFilter from './ModeFilter';
import TempFilter from './TempFilter';
import FilteringControllerHeader from './FilteringControllerHeader';
import FilterStates from './FilterStates';
import useUser from '@/hooks/useUser';

const FilteringController = () => {
  const { user, isUserLoading } = useUser();
  const dispatch = useAppDispatch();
  const {
    mode: modeState,
    isHot,
    distance: distanceState,
  } = useAppSelector(state => state.filter);
  const { userKeyword } = useAppSelector(state => state.userKeyword);

  const [isOpen, setIsOpen] = useState(true);
  const [keywordType, setkeywordType] = useState('가성비');

  const onDistanceChange = (distance: number) => {
    dispatch(setDistance(distance));
  };

  const onModeChange = (mode: string) => {
    dispatch(setMode(mode));
  };

  const onTempChange = (temp: string) => {
    dispatch(setIsHot(temp === 'hot'));
  };

  const onKeywordsChange = (type: string) => {
    if (isUserLoading) return;

    switch (type) {
      case '가성비':
        if (user && userKeyword) {
          dispatch(setKeywords(userKeyword.costEffective));
        } else {
          dispatch(setKeywords(['빽다방', '메가MGC커피', '컴포즈커피']));
        }
        setkeywordType('가성비');
        break;
      case '프리미엄':
        if (user && userKeyword) {
          dispatch(setKeywords(userKeyword.premium));
        } else {
          dispatch(setKeywords(['스타벅스', '폴바셋', '투썸플레이스']));
        }
        setkeywordType('프리미엄');
        break;
      case '나의 카페':
        dispatch(setKeywords(userKeyword.custom));
        setkeywordType('나의 카페');
        break;
    }
  };

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('@/libs/server/firebase');
      const docRef = doc(db, 'user', user.uid);
      const docSnap = await getDoc(docRef);
      dispatch(setUserKeyword(docSnap.data()?.keyword));
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (isUserLoading) return;
    if (!user) {
      dispatch(setKeywords(['빽다방', '메가MGC커피', '컴포즈커피']));
      setkeywordType('가성비');
    }
  }, [isUserLoading]);

  useEffect(() => {
    if (!userKeyword) return;
    switch (keywordType) {
      case '가성비':
        dispatch(setKeywords(userKeyword.costEffective));
        break;
      case '프리미엄':
        dispatch(setKeywords(userKeyword.premium));
        break;
      case '나의 카페':
        dispatch(setKeywords(userKeyword.custom));
        break;
    }
  }, [userKeyword]);

  return (
    <div className='z-20 flex w-full flex-col-reverse md:fixed md:left-4 md:top-4 md:w-80'>
      <div
        className={`h-fit text-sm shadow-lg ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-full opacity-0'}`}
      >
        <DistanceFilter
          distanceState={distanceState}
          onDistanceChange={onDistanceChange}
        />
        <KeywordsFilter
          keywordType={keywordType}
          onKeywordsChange={onKeywordsChange}
          user={user}
        />
        <ModeFilter modeState={modeState} onModeChange={onModeChange} />
        <TempFilter isHot={isHot} onTempChange={onTempChange} />
      </div>
      <div className='z-20'>
        <FilteringControllerHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          isUserLoading={isUserLoading}
        />
        <SearchFilter />
        <FilterStates
          distance={distanceState}
          keywordType={keywordType}
          mode={modeState}
          isHot={isHot}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default FilteringController;
