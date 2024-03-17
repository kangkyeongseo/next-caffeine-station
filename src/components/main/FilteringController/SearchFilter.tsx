import { Search } from '@/image/svgs ';
import React from 'react';

const SearchFilter = () => {
  return (
    <div className='relative'>
      <input
        type='text'
        className='w-full border py-2 pl-4 pr-10 outline-none'
        placeholder='장소 검색'
      />
      <span className='absolute right-4 top-[50%] h-5 w-5 translate-y-[-50%] cursor-pointer'>
        <Search />
      </span>
    </div>
  );
};

export default SearchFilter;
