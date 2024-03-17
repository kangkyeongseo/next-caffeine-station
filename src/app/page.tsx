'use client';
import Map from '@/components/Main/Map';
import CafeList from '@/components/Main/CafeList';
import FilteringController from '@/components/Main/FilteringController';
import useCurrentLocation from '@/hooks/useCurrentLocation';

export default function Home() {
  const { coords, error } = useCurrentLocation();

  return (
    <div className='relative'>
      <FilteringController />
      <Map coords={coords} />
      <CafeList coords={coords} />
    </div>
  );
}
