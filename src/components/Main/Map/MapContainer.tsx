import React from 'react';
import { useAppSelector } from '@/redux/store';
import { BrandType, PlaceType } from '@/types';
import Map from './Map';
import SearchManager from './SearchManager';
import MarkerManager from './MarkerManager';
import MapLoading from '@/components/MapLoading';

interface MapContainerProps {
  brands: BrandType[];
  cafes: PlaceType[];
  setCafes: React.Dispatch<React.SetStateAction<PlaceType[]>>;
  setIsCafesLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchReady: boolean;
  page: number;
  setIsObserverLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const MapContainer = ({
  brands,
  cafes,
  setCafes,
  setIsCafesLoading,
  isSearchReady,
  page,
  setIsObserverLoading,
}: MapContainerProps) => {
  const { isMapLoading } = useAppSelector(state => state.map);

  return (
    <div className='relative flex items-center justify-center'>
      {isMapLoading && <MapLoading />}
      <Map />
      {isSearchReady && (
        <>
          <SearchManager
            setCafes={setCafes}
            setIsCafesLoading={setIsCafesLoading}
            isSearchReady={isSearchReady}
            page={page}
            setIsObserverLoading={setIsObserverLoading}
          />
          <MarkerManager
            brands={brands}
            cafes={cafes}
            isSearchReady={isSearchReady}
          />
        </>
      )}
    </div>
  );
};

export default MapContainer;
