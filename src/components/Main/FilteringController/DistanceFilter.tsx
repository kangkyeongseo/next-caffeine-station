import React from 'react';
import { DistanceType, setDistance } from '@/redux/slices/filterSlice';
import { useAppDispatch } from '@/redux/store';

interface DistanceFilterProps {
  distanceState: DistanceType;
}

const DISTANCE_ARRAY: DistanceType[] = [300, 500, 1000];

const DistanceFilter = React.memo(({ distanceState }: DistanceFilterProps) => {
  const dispatch = useAppDispatch();

  const onDistanceChange = (distance: DistanceType) => {
    dispatch(setDistance(distance));
  };

  return (
    <div className='grid border-collapse grid-cols-3 font-light'>
      {DISTANCE_ARRAY.map(distance => (
        <span
          key={distance}
          className={`cursor-pointer py-[6px] text-center text-white duration-100 md:py-2 ${distanceState === distance ? 'bg-emerald-800 font-medium' : 'bg-emerald-600 hover:bg-emerald-700'}`}
          onClick={() => onDistanceChange(distance)}
        >
          {distance}m
        </span>
      ))}
    </div>
  );
});

DistanceFilter.displayName = 'DistanceFilter';

export default DistanceFilter;
