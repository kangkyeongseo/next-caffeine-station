import React, { useEffect, useState } from 'react';
import { BrandsforKeywordSetting } from './KeywordSetting';

interface KeywordListProps {
  label: string;
  brands: BrandsforKeywordSetting[];
  onBrandClick: (type: string, name: string) => void;
}

const KeywordList = ({ label, brands, onBrandClick }: KeywordListProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (brands.length === 0) return;
    setIsLoading(false);
  }, [brands]);

  if (isLoading) {
    return (
      <div className='flex flex-col gap-2'>
        <div className='h-[14.5px] w-8 rounded-sm bg-gray-200' />
        <ul className='flex flex-wrap gap-1'>
          <li className='h-[26px] w-16 rounded-md bg-gray-200' />
          <li className='h-[26px] w-16 rounded-md bg-gray-200' />
          <li className='h-[26px] w-16 rounded-md bg-gray-200' />
        </ul>
      </div>
    );
  } else {
    return (
      <div className='flex flex-col gap-2'>
        <span className='text-xs'>{label}</span>
        <ul className='flex flex-wrap gap-1'>
          {brands.map(brand => (
            <li
              className={`cursor-pointer rounded-md border px-2 py-1 text-xs ${brand.isChecked ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'hover:bg-gray-100'}`}
              key={brand.name}
              onClick={() => onBrandClick(brand.type, brand.name)}
            >
              {brand.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
};

export default KeywordList;
