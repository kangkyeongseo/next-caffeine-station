import React, { SetStateAction } from 'react';
import Link from 'next/link';
import { User } from 'firebase/auth';
import { ChevrongDown, ChevrongUp } from '@/image/svgs ';
import Spinner from '@/components/Spinner';

interface FilteringControllerHeaderProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
  user: User;
  isUserLoading: boolean;
}

const FilteringControllerHeader = React.memo(
  ({
    isOpen,
    setIsOpen,
    user,
    isUserLoading,
  }: FilteringControllerHeaderProps) => {
    return (
      <div className='flex items-center justify-between bg-emerald-600 px-4 py-2 text-white lg:rounded-t-md'>
        <span>CAFFEINESTATION</span>
        <div className='flex items-center gap-3'>
          <Link href={'/auth'} className='text-sm'>
            {isUserLoading ? (
              <Spinner size='small' color='white' />
            ) : user ? (
              '내 정보'
            ) : (
              '로그인'
            )}
          </Link>
          <span
            className='hidden h-5 w-5 cursor-pointer lg:block'
            onClick={() => setIsOpen(pre => !pre)}
          >
            {isOpen ? <ChevrongDown /> : <ChevrongUp />}
          </span>
        </div>
      </div>
    );
  },
);

FilteringControllerHeader.displayName = 'FilteringControllerHeader';

export default FilteringControllerHeader;
