'use client';
import React, { useState } from 'react';
import { BrandType } from '@/types';
import BrandList from './BrandList';
import useUser from '@/hooks/useUser';
import Unallowed from '../Unallowed';
import dynamic from 'next/dynamic';

interface BrandContainerProps {
  brands: BrandType[];
}

const AddBrandModal = dynamic(() => import('./AddBrandModal'));
const EditBrandModal = dynamic(() => import('./EditBrandModal'));

const BrandContainer = ({ brands }: BrandContainerProps) => {
  const { rule, isUserLoading } = useUser();
  const [selectedBrand, setSelectedBrand] = useState<BrandType | null>(null);
  const [isAddBrandModalOpen, setIsAddBrandModalOpen] = useState(false);
  const [isEditBrandModalOpen, setIsEditBrandModalOpen] = useState(false);

  return (
    <>
      {isUserLoading ? null : rule === 'admin' ? (
        <div className='mx-auto mt-20 min-h-[700px] w-[600px] border-2'>
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
            <AddBrandModal
              setIsAddBrandModalOpen={setIsAddBrandModalOpen}
              rule={rule}
            />
          )}
          {isEditBrandModalOpen && selectedBrand && (
            <EditBrandModal
              brand={selectedBrand}
              setIsEditBrandModalOpen={setIsEditBrandModalOpen}
              rule={rule}
            />
          )}
        </div>
      ) : (
        <Unallowed />
      )}
    </>
  );
};

export default BrandContainer;
