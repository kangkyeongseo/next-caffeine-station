import { BrandType, CafeType } from '@/types';
import React from 'react';
import CafeItem from './CafeItem';

interface CafeListProps {
  filteringCafes: CafeType[];
  brands: BrandType[];
}

const CafeList = ({ filteringCafes, brands }: CafeListProps) => {
  return (
    <ul className='hide-scroll flex h-full snap-x snap-mandatory overflow-x-scroll lg:block lg:overflow-y-scroll'>
      {filteringCafes.length === 0 && (
        <li className='mx-auto flex w-[80%] items-center justify-center rounded-xl border bg-white p-4 text-black/30 lg:rounded-none lg:border-none'>
          <span>조건에 맞는 카페가 없습니다.</span>
        </li>
      )}
      {filteringCafes.map(cafe => (
        <CafeItem key={cafe.id} cafe={cafe} brands={brands} />
      ))}
    </ul>
  );
};

export default CafeList;
