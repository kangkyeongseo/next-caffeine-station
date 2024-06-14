'use client';
import { useState } from 'react';
import { useAppSelector } from '@/redux/store';
import SearchFilter from './SearchFilter';
import useUser from '@/hooks/useUser';
import DistanceFilter from './DistanceFilter';
import KeywordsFilter from './KeywordsFilter';
import ModeFilter from './ModeFilter';
import TempFilter from './TempFilter';
import FilteringControllerHeader from './FilteringControllerHeader';
import FilterStates from './FilterStates';

interface FilteringControllerProps {
  ps: any;
}

const FilteringController = ({ ps }: FilteringControllerProps) => {
  console.log('render');
  const { user, isUserLoading } = useUser();

  const { mode, isHot, distance } = useAppSelector(state => state.filter);

  const [isOpen, setIsOpen] = useState(true);
  const [keywordType, setkeywordType] = useState('가성비');

  return (
    <div className='z-20 flex w-full flex-col-reverse md:fixed md:left-4 md:top-4 md:w-80'>
      <div
        className={`h-fit text-sm shadow-lg ${isOpen ? 'visible translate-y-0 opacity-100' : 'invisible -translate-y-full opacity-0'}`}
      >
        <DistanceFilter distanceState={distance} />
        <KeywordsFilter
          keywordType={keywordType}
          setkeywordType={setkeywordType}
          user={user}
          isUserLoading={isUserLoading}
        />
        <ModeFilter modeState={mode} />
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
