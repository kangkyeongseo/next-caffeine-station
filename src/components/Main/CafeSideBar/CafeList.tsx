import { BrandType, CafeType } from '@/types';
import React from 'react';
import CafeItem from './CafeItem';

interface CafeListProps {
  filteringCafes: CafeType[];
  brands: BrandType[];
}

const CafeList = ({ filteringCafes, brands }: CafeListProps) => {
  return (
    <ul className='hide-scroll h-full md:overflow-y-scroll'>
      {filteringCafes.length === 0 && (
        <li className='flex items-center justify-center p-4 text-black/30'>
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
