import React from 'react';

interface TempFilterProps {
  isHot: boolean;
  onTempChange: (temp: string) => void;
}

const TempFilter = ({ isHot, onTempChange }: TempFilterProps) => {
  return (
    <div className='grid grid-cols-2 border font-light'>
      {['hot', 'ice'].map(temp => (
        <span
          key={temp}
          className={`cursor-pointer py-2 text-center uppercase duration-100 ${(isHot && temp === 'hot') || (!isHot && temp === 'ice') ? 'bg-gray-200 font-medium' : 'bg-white hover:bg-gray-100'}`}
          onClick={() => onTempChange(temp)}
        >
          {temp}
        </span>
      ))}
    </div>
  );
};

export default TempFilter;
