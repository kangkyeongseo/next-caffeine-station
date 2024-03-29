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
    <div className='flex items-center justify-between bg-emerald-600 px-4 py-3 text-white md:rounded-t-md'>
      <span>CAFFEINESTATION</span>
      <span
        className='hidden h-5 w-5 cursor-pointer md:block'
        onClick={() => setIsOpen(pre => !pre)}
      >
        {isOpen ? <ChevrongDown /> : <ChevrongUp />}
      </span>
    </div>
  );
};

export default FilteringControllerHeader;
