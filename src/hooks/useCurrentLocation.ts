import { useEffect, useState } from 'react';
import { CoordsType } from '@/types';

const useCurrentLocation = () => {
  const [coords, setCoords] = useState<CoordsType | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const getCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  };

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  const onError = (err: GeolocationPositionError) => {
    setError(err);
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return { getCurrentLocation, coords, error };
};

export default useCurrentLocation;
