'use client';
import Map from '@/components/main/Map';
import CafeList from '@/components/main/CafeList';
import FilteringController from '@/components/main/FilteringController';
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
