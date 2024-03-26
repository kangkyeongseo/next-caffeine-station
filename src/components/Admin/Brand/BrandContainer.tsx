'use client';
import React, { useState } from 'react';
import BrandList from './BrandList';
import { useForm } from 'react-hook-form';
import { BrandFormType, BrandType } from '@/types';
import SettingBrand from './SettingBrand';
import AddBrand from './AddBrand';

interface BrandContainerProps {
  brands: BrandType[];
}

const BrandContainer = ({ brands }: BrandContainerProps) => {
  const [selectedBrandId, setSelectedBrandId] = useState('');
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const { register, setValue, handleSubmit } = useForm<BrandFormType>();

  return (
    <div>
      <BrandList
        brands={brands}
        setSelectedBrandId={setSelectedBrandId}
        setIsSettingOpen={setIsSettingOpen}
        setValue={setValue}
      />
      <button
        className='fixed bottom-10 right-10 size-20 rounded-full bg-emerald-600 text-white hover:bg-emerald-800'
        onClick={() => setIsAddOpen(true)}
      >
        추가하기
      </button>
      {isSettingOpen && (
        <SettingBrand
          register={register}
          selectedBrandId={selectedBrandId}
          setIsSettingOpen={setIsSettingOpen}
          handleSubmit={handleSubmit}
        />
      )}
      {isAddOpen && <AddBrand setIsAddOpen={setIsAddOpen} />}
    </div>
  );
};

export default BrandContainer;
