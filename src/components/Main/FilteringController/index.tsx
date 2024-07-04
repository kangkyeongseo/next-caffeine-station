'use client';
import { useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { User } from 'firebase/auth';
import SearchFilter from './SearchFilter';
import DistanceFilter from './DistanceFilter';
import KeywordsFilter from './KeywordsFilter';
import ModeFilter from './ModeFilter';
import TempFilter from './TempFilter';
import FilteringControllerHeader from './FilteringControllerHeader';
import FilterStates from './FilterStates';
import { PsType } from '@/types';

interface FilteringControllerProps {
  ps: PsType;
  user: User | null;
  isUserLoading: boolean;
}

const FilteringController = ({
  ps,
  user,
  isUserLoading,
}: FilteringControllerProps) => {
  const { mode, isHot, distance } = useAppSelector(state => state.filter);

  const [isOpen, setIsOpen] = useState(true);
  const [keywordType, setkeywordType] = useState('가성비');

  return (
    <div className='fixed top-0 z-20 flex w-full flex-col-reverse lg:left-4 lg:top-4 lg:w-80'>
      <div
        className={`fixed bottom-0 z-20 h-fit w-full text-sm shadow-lg lg:static ${isOpen ? 'lg:visible lg:translate-y-0' : 'lg:invisible'}`}
      >
        <DistanceFilter distanceState={distance} />
        <KeywordsFilter
          keywordType={keywordType}
          setkeywordType={setkeywordType}
          user={user}
          isUserLoading={isUserLoading}
        />
        <ModeFilter mode={mode} />
        <TempFilter isHot={isHot} />
      </div>
      <div className='z-20'>
        <FilteringControllerHeader
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          isUserLoading={isUserLoading}
        />
        <SearchFilter ps={ps} />
        <FilterStates
          distance={distance}
          keywordType={keywordType}
          mode={mode}
          isHot={isHot}
          setIsOpen={setIsOpen}
        />
      </div>
    </div>
  );
};

export default FilteringController;
