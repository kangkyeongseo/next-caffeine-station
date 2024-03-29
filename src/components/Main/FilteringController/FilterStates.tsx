import React, { SetStateAction } from 'react';

interface FilterStatesProps {
  distance: number;
  keywordType: string;
  mode: string;
  isHot: boolean;
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FilterStates = ({
  distance,
  keywordType,
  mode,
  isHot,
  setIsOpen,
}: FilterStatesProps) => {
  const onClick = () => {
    setIsOpen(pre => !pre);
  };
  return (
    <div
      className='grid cursor-pointer grid-cols-5 bg-gray-200 py-1 text-xs text-gray-500'
      onClick={onClick}
    >
      <span className='text-center'>필터</span>
      <span className='text-center'>{distance}m</span>
      <span className='text-center'>{keywordType}</span>
      <span className='text-center'>
        {mode === 'price' && '가격(잔)'}
        {mode === 'mlPrice' && '가격(ml)'}
        {mode === 'caffeinePrice' && '카페인가격'}
      </span>
      <span className='text-center'>{isHot ? 'HOT' : 'ICE'}</span>
    </div>
  );
};

export default FilterStates;
