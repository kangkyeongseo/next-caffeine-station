'use client';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setDistance,
  setIsHot,
  setKeywords,
  setMode,
} from '@/redux/slices/filterSlice';
import SearchFilter from './SearchFilter';
import DistanceFilter from './DistanceFilter';
import KeywordsFilter from './KeywordsFilter';
import ModeFilter from './ModeFilter';
import TempFilter from './TempFilter';
import FilteringControllerHeader from './FilteringControllerHeader';
import FilterStates from './FilterStates';
import useUser from '@/hooks/useUser';

const FilteringController = () => {
  const { user } = useUser();
  console.log(user);
  const dispatch = useAppDispatch();
  const {
    mode: modeState,
    isHot,
    distance: distanceState,
  } = useAppSelector(state => state.filter);

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
    switch (type) {
      case '가성비':
        dispatch(setKeywords(['빽다방', '메가MGC커피', '컴포즈커피']));
        setkeywordType('가성비');
        break;
      case '프리미엄':
        dispatch(setKeywords(['스타벅스', '폴바셋', '투썸플레이스']));
        setkeywordType('프리미엄');
        break;
      default:
    }
  };

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
        />
        <ModeFilter modeState={modeState} onModeChange={onModeChange} />
        <TempFilter isHot={isHot} onTempChange={onTempChange} />
      </div>
      <div className='z-20'>
        <FilteringControllerHeader isOpen={isOpen} setIsOpen={setIsOpen} />
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
