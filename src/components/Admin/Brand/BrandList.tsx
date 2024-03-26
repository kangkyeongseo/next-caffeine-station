import React from 'react';
import { UseFormSetValue } from 'react-hook-form';
import { BrandFormType, BrandType } from '@/types';

interface BrandListProps {
  brands: BrandType[];
  setSelectedBrandId: React.Dispatch<React.SetStateAction<string>>;
  setIsSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: UseFormSetValue<BrandFormType>;
}

const BrandList = ({
  brands,
  setSelectedBrandId,
  setIsSettingOpen,
  setValue,
}: BrandListProps) => {
  const onListClick = (brand: any) => {
    setIsSettingOpen(true);
    setSelectedBrandId(brand.id);
    setValue('cafeName', brand.name);
    setValue('cafeType', brand.type);
    setValue('hotPrice', brand.hot.price);
    setValue('hotAmount', brand.hot.amount);
    setValue('hotCaffeine', brand.hot.caffeine);
    setValue('icePrice', brand.ice.price);
    setValue('iceAmount', brand.ice.amount);
    setValue('iceCaffeine', brand.ice.caffeine);
  };

  return (
    <ul className='w-[800px] list-none'>
      <li className='grid grid-cols-4 bg-emerald-600 text-white'>
        <div className='w-full border border-black py-1 text-center'>
          카페명
        </div>
        <div className='w-full border border-l-0 border-black py-1 text-center'>
          타입
        </div>
        <div className='w-full border border-l-0 border-black py-1 text-center'>
          Hot
        </div>
        <div className='w-full border border-l-0 border-black py-1 text-center'>
          Ice
        </div>
      </li>
      {brands.map(brand => (
        <li
          key={brand.id}
          onClick={() => onListClick(brand)}
          className='group relative grid cursor-pointer grid-cols-4'
        >
          <div className='flex w-full items-center justify-center border border-t-0 border-black text-center'>
            {brand.name}
          </div>
          <div className='flex w-full items-center justify-center border border-l-0 border-t-0 border-black text-center'>
            {brand.type}
          </div>
          <div className='w-full border border-l-0 border-t-0 border-black text-center'>
            <div className='grid grid-cols-[2fr,5fr] border-b border-black'>
              <span className='border-r border-black'>가격</span>
              <span>{brand.hot.price}원</span>
            </div>
            <div className='grid grid-cols-[2fr,5fr] border-b border-black'>
              <span className='border-r border-black'>용량</span>
              <span>{brand.hot.amount}ml</span>
            </div>
            <div className='grid grid-cols-[2fr,5fr] '>
              <span className='border-r border-black'>카페인</span>
              <span>{brand.hot.caffeine}mg</span>
            </div>
          </div>
          <div className='w-full border border-l-0 border-t-0 border-black text-center'>
            <div className='grid grid-cols-[2fr,5fr] border-b border-black'>
              <span className='border-r border-black'>가격</span>
              <span>{brand.ice.price}원</span>
            </div>
            <div className='grid grid-cols-[2fr,5fr] border-b border-black'>
              <span className='border-r border-black'>용량</span>
              <span>{brand.ice.amount}ml</span>
            </div>
            <div className='grid grid-cols-[2fr,5fr] '>
              <span className='border-r border-black'>카페인</span>
              <span>{brand.ice.caffeine}mg</span>
            </div>
          </div>
          <div className='absolute  hidden h-full w-full items-center justify-center bg-black/70 text-xl text-white group-hover:flex'>
            수정하기
          </div>
        </li>
      ))}
    </ul>
  );
};

export default BrandList;
