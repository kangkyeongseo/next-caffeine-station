import React, { SetStateAction } from 'react';
import { ChevrongDown, ChevrongUp } from '@/image/svgs ';
import Link from 'next/link';
import { signOut } from 'firebase/auth';
import { auth } from '@/libs/server/firebase';

interface FilteringControllerHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  user: any;
  isUserLoading: boolean;
}

const FilteringControllerHeader = ({
  isOpen,
  setIsOpen,
  user,
  isUserLoading,
}: FilteringControllerHeaderProps) => {
  return (
    <div className='flex items-center justify-between bg-emerald-600 px-4 py-2 text-white  md:rounded-t-md md:py-3'>
      <span>CAFFEINESTATION</span>
      <div className='flex items-center gap-3'>
        <Link href={'/auth'} className='text-sm'>
          {isUserLoading ? null : user ? '내 정보' : '로그인'}
        </Link>
        <span
          className='hidden h-5 w-5 cursor-pointer md:block'
          onClick={() => setIsOpen(pre => !pre)}
        >
          {isOpen ? <ChevrongDown /> : <ChevrongUp />}
        </span>
      </div>
    </div>
  );
};

export default FilteringControllerHeader;
