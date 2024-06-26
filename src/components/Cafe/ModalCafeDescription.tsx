import React from 'react';
import { Phone, Place } from '@/image/svgs ';
import { CafeType } from '@/types';

interface ModalCafeDescriptionProps {
  cafe: CafeType | null;
}

const ModalCafeDescription = ({ cafe }: ModalCafeDescriptionProps) => {
  return (
    <div className='flex h-[80px] flex-col gap-2 border-b px-4 lg:h-[100px]'>
      <span className='text-sm lg:text-base lg:font-bold'>상세정보</span>
      <div className='grid grid-cols-[3fr,2fr] gap-1 lg:gap-4'>
        <div className='flex items-start gap-1'>
          <Place />
          <div className='flex flex-col'>
            {cafe ? (
              <>
                <span className='text-xs leading-4 lg:text-sm'>
                  {cafe?.road_address_name ? cafe?.road_address_name : '-'}
                </span>
                <span className='text-[10px] font-light text-gray-500 lg:text-xs'>
                  지번 | {cafe?.address_name}
                </span>
              </>
            ) : (
              <>
                <div className='flex h-8 flex-col justify-between'>
                  <div className='h-3 w-40 rounded-sm bg-gray-50'></div>
                  <div className='h-3 w-32 rounded-sm bg-gray-50'></div>
                </div>
              </>
            )}
          </div>
        </div>
        <div className='flex items-start gap-1'>
          <Phone />
          {cafe ? (
            <span className='text-xs leading-4 lg:text-sm'>{cafe?.phone}</span>
          ) : (
            <div className='h-3 w-24 rounded-sm bg-gray-50 lg:w-32'></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalCafeDescription;
