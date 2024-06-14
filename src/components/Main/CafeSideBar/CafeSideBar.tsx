'use client';
import React, { useEffect, useState } from 'react';
import { BrandType, CafeType } from '@/types';
import { ChevrongLeft, ChevrongRight } from '@/image/svgs ';
import CafeFilter from './CafeFilter';
import CafeList from './CafeList';

interface CafeSideBarProps {
  brands: BrandType[];
  cafes: CafeType[];
}

const CafeSideBar = ({ brands, cafes }: CafeSideBarProps) => {
  const [filteringCafes, setFilteringCafes] = useState<CafeType[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setFilteringCafes(cafes);
  }, [cafes]);

  return (
    <div
      className={`z-10 h-full w-full bg-white pb-5 duration-200 md:absolute md:right-0 md:top-0 md:w-80 md:pb-10 md:shadow-md ${isOpen ? 'translate-x-0' : 'translate-x-80'}`}
    >
      <CafeFilter cafes={cafes} setFilteringCafes={setFilteringCafes} />
      <CafeList filteringCafes={filteringCafes} brands={brands} />
      <div
        className='absolute left-[-25px] top-[50%] hidden h-10 w-5 cursor-pointer rounded-md bg-white shadow-md md:flex'
        onClick={() => setIsOpen(pre => !pre)}
      >
        {isOpen ? <ChevrongRight /> : <ChevrongLeft />}
      </div>
    </div>
  );
};

export default CafeSideBar;
