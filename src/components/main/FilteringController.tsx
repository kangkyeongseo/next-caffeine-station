import { setIsHot, setMode } from '@/redux/slices/filterSlice';
import { useAppDispatch } from '@/redux/store';
import React, { Dispatch, SetStateAction } from 'react';

interface FilteringControllerProps {
  distance: number;
  setDistance: Dispatch<SetStateAction<number>>;
  setKeywords: Dispatch<SetStateAction<string[]>>;
}

const FilteringController = ({
  distance,
  setDistance,
  setKeywords,
}: FilteringControllerProps) => {
  const dispatch = useAppDispatch();
  const onDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setDistance(Number(value));
  };
  const onKeywordsChange = (type: string) => {
    switch (type) {
      case '가성비':
        setKeywords(['빽다방', '메가커피', '컴포즈커피']);
        break;
      case '프리미엄':
        setKeywords(['스타벅스', '폴바셋', '투썸플레이스']);
        break;
      default:
    }
  };
  return (
    <div className='fixed z-10 h-screen w-80 bg-white'>
      <div>
        <input
          type='range'
          max={10}
          min={1}
          step={1}
          value={distance}
          onChange={onDistanceChange}
        />
        <span>{distance}</span>
      </div>
      <div className='flex gap-4'>
        <span onClick={() => onKeywordsChange('가성비')}>가성비</span>
        <span onClick={() => onKeywordsChange('프리미엄')}>프리미엄</span>
      </div>
      <div className='flex gap-2'>
        <div
          className='cursor-pointer font-light'
          onClick={() => dispatch(setMode('price'))}
        >
          가격(잔)
        </div>
        <div
          className='cursor-pointer font-light'
          onClick={() => dispatch(setMode('mlPrice'))}
        >
          가격(ml)
        </div>
        <div
          className='cursor-pointer font-light'
          onClick={() => dispatch(setMode('caffeinePrice'))}
        >
          카페인가격(ml)
        </div>
      </div>
      <div className='flex gap-2'>
        <div
          className='cursor-pointer font-light'
          onClick={() => dispatch(setIsHot(true))}
        >
          HOT
        </div>
        <div
          className='cursor-pointer font-light'
          onClick={() => dispatch(setIsHot(false))}
        >
          ICE
        </div>
      </div>
    </div>
  );
};

export default FilteringController;
