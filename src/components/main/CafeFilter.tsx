import React, { SetStateAction, useState } from 'react';
import { Search } from '@/image/svgs ';
import { setFilterdValue } from '@/redux/slices/overlayCafeSlice';
import { useAppDispatch } from '@/redux/store';
import { CafeType } from '@/types';

interface CafeFilterProps {
  cafes: CafeType[];
  setFilteringCafes: React.Dispatch<SetStateAction<CafeType[]>>;
}

const CafeFilter = ({ cafes, setFilteringCafes }: CafeFilterProps) => {
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');
  const [isFiltered, setIsFiltered] = useState(false);

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    // 필터링 검색 후 input의 값이 비어있을때 실행
    if (isFiltered && event.target.value.length === 0) {
      // 초기 검색된 전체 카페 나열
      setFilteringCafes(
        cafes.sort((a, b) => {
          return Number(a.distance) - Number(b.distance);
        }),
      );
      setIsFiltered(false);
      // 커스텀 오버레이와 상태 공유 (input의 값에 따라 오버레이만 히든 처리)
      dispatch(setFilterdValue(null));
    }
  };

  const handleKeywordSearch = (event: React.FormEvent) => {
    event.preventDefault();
    // input의 값에 따라 카페 필터링
    const keywordFilteringCafe = cafes.filter(cafe => {
      if (cafe.place_name.includes(inputValue)) {
        return cafe;
      }
    });
    // 카페 거리별로 정렬
    setFilteringCafes(
      keywordFilteringCafe.sort((a, b) => {
        return Number(a.distance) - Number(b.distance);
      }),
    );
    setIsFiltered(true);
    // 커스텀 오버레이와 상태 공유 (input의 값에 따라 오버레이만 히든 처리)
    dispatch(setFilterdValue(inputValue));
  };

  return (
    <div className='sticky top-0 w-full'>
      <form className='relative' onSubmit={handleKeywordSearch}>
        <input
          type='text'
          className='w-full border py-2 pl-4 pr-10 outline-none'
          placeholder='카페 검색'
          value={inputValue}
          onChange={onChange}
        />
        <span className='absolute right-4 top-[50%] h-5 w-5 translate-y-[-50%] cursor-pointer'>
          <Search />
        </span>
      </form>
    </div>
  );
};

export default CafeFilter;
