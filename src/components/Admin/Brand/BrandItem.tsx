import React from 'react';
import { BrandType } from '@/types';

interface BrandItemProps {
  brand: BrandType;
  onClickToOpenEditModal: (brand: BrandType) => void;
}

const BrandItem = ({ brand, onClickToOpenEditModal }: BrandItemProps) => {
  return (
    <li
      onClick={() => onClickToOpenEditModal(brand)}
      className='relative grid cursor-pointer grid-cols-4 border-b-2 hover:bg-gray-100'
    >
      <div className='flex w-full items-center justify-center border-r-2'>
        <span>{brand.name}</span>
      </div>
      <div className='flex w-full items-center justify-center border-r-2'>
        <span>{brand.type}</span>
      </div>
      <div className='grid w-full grid-rows-3 border-r-2'>
        <div className='grid grid-cols-[3fr,5fr] border-b-2'>
          <span className='border-r-2 text-center'>가격</span>
          <span className='text-center'>{brand.hot.price}원</span>
        </div>
        <div className='grid grid-cols-[3fr,5fr] border-b-2'>
          <span className='border-r-2 text-center'>용량</span>
          <span className='text-center'>{brand.hot.amount}ml</span>
        </div>
        <div className='grid grid-cols-[3fr,5fr]'>
          <span className='border-r-2 text-center'>카페인</span>
          <span className='text-center'>{brand.hot.caffeine}mg</span>
        </div>
      </div>
      <div className='grid w-full grid-rows-3 border-r-2'>
        <div className='grid grid-cols-[3fr,5fr] border-b-2'>
          <span className='border-r-2 text-center'>가격</span>
          <span className='text-center'>{brand.ice.price}원</span>
        </div>
        <div className='grid grid-cols-[3fr,5fr] border-b-2'>
          <span className='border-r-2 text-center'>용량</span>
          <span className='text-center'>{brand.ice.amount}ml</span>
        </div>
        <div className='grid grid-cols-[3fr,5fr]'>
          <span className='border-r-2 text-center'>카페인</span>
          <span className='text-center'>{brand.ice.caffeine}mg</span>
        </div>
      </div>
    </li>
  );
};

export default BrandItem;
