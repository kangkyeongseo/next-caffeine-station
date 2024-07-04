import React from 'react';
import { ModeType, setMode } from '@/redux/slices/filterSlice';
import { useAppDispatch } from '@/redux/store';

interface ModeFilterProps {
  mode: string;
}

const MODE_ARRAY: ModeType[] = ['price', 'mlPrice', 'caffeinePrice'];

const ModeFilter = React.memo(({ mode: selectedMode }: ModeFilterProps) => {
  const dispatch = useAppDispatch();
  const onModeChange = (mode: ModeType) => {
    dispatch(setMode(mode));
  };

  return (
    <div className='grid grid-cols-3 font-light'>
      {MODE_ARRAY.map(mode => (
        <span
          key={mode}
          className={`cursor-pointer py-[6px] text-center text-white duration-100 md:py-2 ${selectedMode === mode ? 'bg-emerald-800 font-medium' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          onClick={() => onModeChange(mode)}
        >
          {mode === 'price' && '가격(잔)'}
          {mode === 'mlPrice' && '가격(ml)'}
          {mode === 'caffeinePrice' && '카페인가격'}
        </span>
      ))}
    </div>
  );
});

ModeFilter.displayName = 'ModeFilter';

export default ModeFilter;
