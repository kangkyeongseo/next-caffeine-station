import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsMapLoading } from '@/redux/slices/mapSlice';
import { CafeType } from '@/types';
import { setContent, setIsOpen } from '@/redux/slices/toastSlice';

interface SearchManagerProps {
  ps: any;
  setCafes: React.Dispatch<React.SetStateAction<CafeType[]>>;
  isPsReady: boolean;
  setIsPsReady: React.Dispatch<React.SetStateAction<boolean>>;
  isSearchReady: boolean;
}

const SearchManager: React.FC<SearchManagerProps> = ({
  ps,
  setCafes,
  isPsReady,
  setIsPsReady,
  isSearchReady,
}) => {
  const dispatch = useAppDispatch();
  const { map, coords } = useAppSelector(state => state.map);
  const { distance, keywords } = useAppSelector(state => state.filter);

  const placesSearchCB = (data: CafeType[], status: string) => {
    return new Promise<CafeType[]>((resolve, reject) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        reject();
      }
    });
  };

  const keywordsSearch = (keywords: string[]) => {
    const promises = keywords.map(
      keyword =>
        new Promise<CafeType[]>((resolve, reject) => {
          ps.keywordSearch(
            keyword,
            (data: CafeType[], status: string) =>
              placesSearchCB(data, status)
                .then(data => resolve(data))
                .catch(() => reject()),
            {
              location: new window.kakao.maps.LatLng(
                coords?.latitude,
                coords?.longitude,
              ),
              radius: distance,
            },
          );
        }),
    );

    return Promise.allSettled(promises);
  };

  useEffect(() => {
    if (ps && map) {
      ps.setMap(map);
      setIsPsReady(true);
    }
  }, [ps, map]);

  useEffect(() => {
    if (!isPsReady) return;
    if (!isSearchReady) return;

    const fetchData = async () => {
      const results = await keywordsSearch(keywords);
      const fulfilledResults = results
        .filter(result => result.status === 'fulfilled')
        .flatMap(result => (result as PromiseFulfilledResult<CafeType[]>).value)
        .sort((a, b) => {
          return Number(a.distance) - Number(b.distance);
        });
      setCafes(fulfilledResults);
    };

    const debounce = setTimeout(() => {
      fetchData();
    }, 400);

    dispatch(setIsMapLoading(true));

    dispatch(setIsOpen(false));
    dispatch(setContent(''));

    return () => clearTimeout(debounce);
  }, [isPsReady, isSearchReady, distance, keywords, coords]);

  return null;
};

export default SearchManager;
