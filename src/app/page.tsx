'use client';
import Map from '@/components/main/Map';
import CafeList from '@/components/main/CafeList';
import FilteringController from '@/components/main/FilteringController';
import { useState } from 'react';
import useCurrentLocation from '@/hooks/useCurrentLocation';

export default function Home() {
  const { coords, error } = useCurrentLocation();
  const [distance, setDistance] = useState<number>(3);
  const [kerwords, setKeywords] = useState<string[]>([]);
  return (
    <div className='relative'>
      <FilteringController
        distance={distance}
        setDistance={setDistance}
        setKeywords={setKeywords}
      />
      <Map coords={coords} />
      <CafeList distance={distance} kerwords={kerwords} coords={coords} />
    </div>
  );
}
