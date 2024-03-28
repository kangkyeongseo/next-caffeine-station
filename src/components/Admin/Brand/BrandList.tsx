import React from 'react';
import { BrandType } from '@/types';
import BrandItem from './BrandItem';

interface BrandListProps {
  brands: BrandType[];
  setSelectedBrand: React.Dispatch<React.SetStateAction<BrandType | null>>;
  setIsEditBrandModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrandList = ({
  brands,
  setSelectedBrand,
  setIsEditBrandModalOpen,
}: BrandListProps) => {
  const onClickToOpenEditModal = (brand: BrandType) => {
    setIsEditBrandModalOpen(true);
    setSelectedBrand(brand);
  };

  return (
    <div>
      <div className='grid grid-cols-4 border-b-2 bg-gray-500 text-white'>
        <span className='w-full border-r-2 py-2 text-center'>카페명</span>
        <span className='w-full border-r-2 py-2 text-center'>타입</span>
        <span className='w-full border-r-2 py-2 text-center'>Hot</span>
        <span className='w-full py-2 text-center'>Ice</span>
      </div>
      <ul>
        {brands.map(brand => (
          <BrandItem
            key={brand.id}
            brand={brand}
            onClickToOpenEditModal={onClickToOpenEditModal}
          />
        ))}
      </ul>
    </div>
  );
};

export default BrandList;
