import React from 'react';
import { Phone, Place } from '@/image/svgs ';
import { CafeType } from '@/types';

interface ModalCafeDescriptionProps {
  cafe: CafeType | null;
}

const ModalCafeDescription = ({ cafe }: ModalCafeDescriptionProps) => {
  return (
    <div className='flex flex-col gap-2 px-4'>
      <span className='font-bold'>상세정보</span>
      <div className='flex gap-4'>
        <div className='flex items-start gap-1'>
          <Place />
          <div className='flex flex-col'>
            <span className='text-sm leading-4'>{cafe?.road_address_name}</span>
            <span className='text-xs font-light text-gray-500'>
              지번 | {cafe?.address_name}
            </span>
          </div>
        </div>
        <div className='flex items-start gap-1'>
          <Phone />
          <span className='text-sm leading-4'>{cafe?.phone}</span>
        </div>
      </div>
    </div>
  );
};

export default ModalCafeDescription;
