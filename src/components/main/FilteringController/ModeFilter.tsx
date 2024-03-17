import React from 'react';

interface ModeFilterProps {
  modeState: string;
  onModeChange: (mode: string) => void;
}

const ModeFilter = ({ modeState, onModeChange }: ModeFilterProps) => {
  return (
    <div className='grid grid-cols-3 font-light'>
      {['price', 'mlPrice', 'caffeinePrice'].map(mode => (
        <span
          key={mode}
          className={`cursor-pointer py-2 text-center text-white ${modeState === mode ? 'bg-[#0e4022] font-medium' : 'bg-green-900'}`}
          onClick={() => onModeChange(mode)}
        >
          {mode === 'price' && '가격(잔)'}
          {mode === 'mlPrice' && '가격(ml)'}
          {mode === 'caffeinePrice' && '카페인가격(ml)'}
        </span>
      ))}
    </div>
  );
};

export default ModeFilter;
