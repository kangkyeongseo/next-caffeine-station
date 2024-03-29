import React from 'react';

interface DistanceFilterProps {
  distanceState: number;
  onDistanceChange: (distance: number) => void;
}

const DistanceFilter = ({
  distanceState,
  onDistanceChange,
}: DistanceFilterProps) => {
  return (
    <div className='grid border-collapse grid-cols-3 font-light'>
      {[300, 500, 1000].map(distance => (
        <span
          key={distance}
          className={`cursor-pointer  py-2 text-center text-white duration-100 ${distanceState === distance ? 'bg-emerald-800 font-medium' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          onClick={() => onDistanceChange(distance)}
        >
          {distance}m
        </span>
      ))}
    </div>
  );
};

export default DistanceFilter;
