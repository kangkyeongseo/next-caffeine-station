import React from 'react';
import { setMode } from '@/redux/slices/filterSlice';
import { useAppDispatch } from '@/redux/store';

interface ModeFilterProps {
  modeState: string;
}

const ModeFilter = React.memo(({ modeState }: ModeFilterProps) => {
  const dispatch = useAppDispatch();
  const onModeChange = (mode: string) => {
    dispatch(setMode(mode));
  };

  return (
    <div className='grid grid-cols-3 font-light'>
      {['price', 'mlPrice', 'caffeinePrice'].map(mode => (
        <span
          key={mode}
          className={`cursor-pointer py-[6px] text-center text-white duration-100 md:py-2 ${modeState === mode ? 'bg-emerald-800 font-medium' : 'bg-emerald-600 hover:bg-emerald-700'}`}
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
