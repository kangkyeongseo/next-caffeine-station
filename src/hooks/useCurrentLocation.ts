import { useEffect, useState } from 'react';
import { CoordsType } from '@/types';

const useCurrentLocation = () => {
  const [coords, setCoords] = useState<CoordsType | null>(null);
  const [error, setError] = useState<GeolocationPositionError | null>(null);

  const onSuccess = ({
    coords: { latitude, longitude },
  }: GeolocationPosition) => {
    setCoords({ latitude, longitude });
  };

  const onError = (err: GeolocationPositionError) => {
    setError(err);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return { coords, error };
};

export default useCurrentLocation;
