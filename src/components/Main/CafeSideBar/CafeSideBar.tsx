'use client';
import React, { useEffect, useState } from 'react';
import { BrandType, PlaceType } from '@/types';
import { ChevrongLeft, ChevrongRight } from '@/image/svgs ';
import CafeFilter from './CafeFilter';
import CafeList from './CafeList';

interface CafeSideBarProps {
  brands: BrandType[];
  cafes: PlaceType[];
}

const CafeSideBar = ({ brands, cafes }: CafeSideBarProps) => {
  const [filteringCafes, setFilteringCafes] = useState<PlaceType[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setFilteringCafes(cafes);
  }, [cafes]);

  return (
    <div
      className={`absolute bottom-[150px] z-10 h-20 w-full duration-200 lg:right-0 lg:top-0 lg:h-full lg:w-80 lg:bg-white lg:pb-10 lg:shadow-md ${isOpen ? 'translate-x-0' : 'translate-x-80'}`}
    >
      <CafeFilter cafes={cafes} setFilteringCafes={setFilteringCafes} />
      <CafeList filteringCafes={filteringCafes} brands={brands} />
      <div
        className='absolute left-[-25px] top-[50%] hidden h-10 w-5 cursor-pointer rounded-md bg-white shadow-md lg:flex'
        onClick={() => setIsOpen(pre => !pre)}
      >
        {isOpen ? <ChevrongRight /> : <ChevrongLeft />}
      </div>
    </div>
  );
};

export default CafeSideBar;
