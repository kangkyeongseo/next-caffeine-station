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
  return (
    <div className='fixed z-10 h-screen w-80 bg-white'>
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
  );
};

export default FilteringController;
