'use client';
import React, { useState } from 'react';
import { BrandType } from '@/types';
import BrandList from './BrandList';
import EditBrandModal from './EditBrandModal';
import AddBrandModal from './AddBrandModal';

interface BrandContainerProps {
  brands: BrandType[];
}

const BrandContainer = ({ brands }: BrandContainerProps) => {
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);

  return (
    <>
      <div className='relative bg-black/80 py-2 text-center'>
        <span className='text-white'>브랜드</span>
        <button
          onClick={() => setIsAddBrandModalOpen(true)}
          className='absolute right-4 top-[50%] translate-y-[-50%] rounded-sm bg-emerald-600 px-2 py-[2px] text-sm text-white hover:bg-emerald-700'
        >
          추가하기
        </button>
      </div>
      <BrandList
        brands={brands}
        setSelectedBrand={setSelectedBrand}
        setIsEditBrandModalOpen={setIsEditBrandModalOpen}
      />
      {isAddBrandModalOpen && (
        <AddBrandModal setIsAddBrandModalOpen={setIsAddBrandModalOpen} />
      )}
      {isEditBrandModalOpen && selectedBrand && (
        <EditBrandModal
          brand={selectedBrand}
          setIsEditBrandModalOpen={setIsEditBrandModalOpen}
        />
      )}
    </>
  );
};

export default BrandContainer;
