import React from 'react';
import { TempType, setIsHot } from '@/redux/slices/filterSlice';
import { useAppDispatch } from '@/redux/store';

interface TempFilterProps {
  isHot: boolean;
}

const TEMP_ARRAY: TempType[] = ['hot', 'ice'];

const TempFilter = React.memo(({ isHot }: TempFilterProps) => {
  const dispatch = useAppDispatch();
  const onTempChange = (temp: TempType) => {
    dispatch(setIsHot(temp === 'hot'));
  };
  return (
    <div className='grid grid-cols-2 border font-light'>
      {TEMP_ARRAY.map(temp => (
        <span
          key={temp}
          className={`cursor-pointer py-[6px] text-center uppercase duration-100 md:py-2 ${(isHot && temp === 'hot') || (!isHot && temp === 'ice') ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-100'}`}
          onClick={() => onTempChange(temp)}
        >
          {temp}
        </span>
      ))}
    </div>
  );
});

TempFilter.displayName = 'TempFilter';

export default TempFilter;
