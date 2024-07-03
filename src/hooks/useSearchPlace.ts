import { useCallback, useEffect, useState } from 'react';
import { PlaceType, PsType } from '@/types';

const useSearchPlace = (ps: PsType) => {
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const placesSearchCB = useCallback((data: PlaceType[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);
    } else {
      setPlaces([]);
    }
  }, []);

  useEffect(() => {
    if (!ps) return;
    if (searchKeyword.length === 0) {
      setPlaces([]);
      return;
    }

    const debounce = setTimeout(() => {
      ps.keywordSearch(searchKeyword, placesSearchCB, { size: 5 });
    }, 500);

    return () => clearTimeout(debounce);
  }, [ps, searchKeyword, placesSearchCB]);

  return { places, setSearchKeyword };
};

export default useSearchPlace;
