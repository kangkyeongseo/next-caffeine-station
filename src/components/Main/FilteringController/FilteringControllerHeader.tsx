import React, { SetStateAction } from 'react';
import { ChevrongDown, ChevrongUp } from '@/image/svgs ';

interface FilteringControllerHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FilteringControllerHeader = ({
  isOpen,
  setIsOpen,
}: FilteringControllerHeaderProps) => {
  return (
    <div className='flex items-center justify-between rounded-t-md bg-emerald-600 px-4 py-3 text-white'>
      <span>CAFFEINESTATION</span>
      <span
        className='h-5 w-5 cursor-pointer'
        onClick={() => setIsOpen(pre => !pre)}
      >
        {isOpen ? <ChevrongDown /> : <ChevrongUp />}
      </span>
    </div>
  );
};

export default FilteringControllerHeader;
