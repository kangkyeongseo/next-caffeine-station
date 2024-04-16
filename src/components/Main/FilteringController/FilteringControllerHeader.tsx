import React, { SetStateAction } from 'react';
import { ChevrongDown, ChevrongUp } from '@/image/svgs ';
import Link from 'next/link';

interface FilteringControllerHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FilteringControllerHeader = ({
  isOpen,
  setIsOpen,
}: FilteringControllerHeaderProps) => {
  return (
    <div className='flex items-center justify-between bg-emerald-600 px-4 py-2 text-white  md:rounded-t-md md:py-3'>
      <span>CAFFEINESTATION</span>
      <Link href={'/auth'}>로그인</Link>
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
