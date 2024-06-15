import React, { useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { BrandType, CafeType } from '@/types';
import Map from './Map';
import SearchManager from './SearchManager';
import MarkerManager from './MarkerManager';
import MapLoading from '@/components/MapLoading';

interface MapContainerProps {
  ps: any;
  brands: BrandType[];
  cafes: CafeType[];
  setCafes: React.Dispatch<React.SetStateAction<CafeType[]>>;
}

const MapContainer = ({ ps, brands, cafes, setCafes }: MapContainerProps) => {
  const { isMapLoading } = useAppSelector(state => state.map);
  const [isPsReady, setIsPsReady] = useState(false);

  return (
    <div className='relative flex items-center justify-center'>
      {isMapLoading && <MapLoading />}
      <Map />
      <SearchManager
        ps={ps}
        cafes={cafes}
        setCafes={setCafes}
        isPsReady={isPsReady}
        setIsPsReady={setIsPsReady}
      />
      <MarkerManager brands={brands} cafes={cafes} isPsReady={isPsReady} />
    </div>
  );
};

export default MapContainer;
