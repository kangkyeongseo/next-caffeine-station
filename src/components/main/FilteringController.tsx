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
    </div>
  );
};

export default FilteringController;
