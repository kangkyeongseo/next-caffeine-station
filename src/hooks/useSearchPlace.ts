import { useCallback, useEffect, useState } from 'react';
import { PlaceType, SearchOptionType } from '@/types';
import { useAppSelector } from '@/redux/store';

/**
 * @param ps 카카오 장소 검색 서비스 객체
 * @param option 중심 좌표 및 중심 좌표로부터의 거리
 */

const CAFE_CATEGORY_CODE = 'CE7';

const useSearchPlace = ({
  keyword,
  option,
}: {
  keyword: string | string[];
  option?: SearchOptionType | null;
}) => {
  const { ps } = useAppSelector(state => state.ps);

  const [places, setPlaces] = useState<PlaceType[]>([]);

  const placesSearchCB = useCallback(
    (data: PlaceType[], status: string): Promise<PlaceType[]> => {
      return new Promise((resolve, reject) => {
        if (status === window.kakao.maps.services.Status.OK) {
          resolve(data);
        } else {
          reject();
        }
      });
    },
    [],
  );

  const searchForSingleKeyword = useCallback(
    (keyword: string) => {
      ps.keywordSearch(
        keyword,
        (data: PlaceType[], status: string) =>
          placesSearchCB(data, status)
            .then(data => setPlaces(data))
            .catch(() => setPlaces([])),
        { size: 5 },
      );
    },
    [ps, option, placesSearchCB],
  );

  const searchForMultipleKeywords = useCallback(
    (keywords: string[]) => {
      // 각각의 키워드를 Promise 객체로 생성
      const promises = keywords.map(
        (keyword): Promise<PlaceType[]> =>
          new Promise((resolve, reject) => {
            ps.keywordSearch(
              keyword,
              (data: PlaceType[], status: string) =>
                placesSearchCB(data, status)
                  .then(data => resolve(data))
                  .catch(() => reject()),
              option,
            );
          }),
      );
      return Promise.allSettled(promises);
    },
    [ps, option, placesSearchCB],
  );

  const searchForCategoryKeyword = useCallback(() => {
    ps.categorySearch(
      CAFE_CATEGORY_CODE,
      (data: PlaceType[], status: string) =>
        placesSearchCB(data, status)
          .then(data =>
            setPlaces(
              data.sort((a, b) => {
                return Number(a.distance) - Number(b.distance);
              }),
            ),
          )
          .catch(() => setPlaces([])),
      option,
    );
  }, [ps, option, placesSearchCB]);

  useEffect(() => {
    if (!ps) return;
    if (keyword.length === 0) {
      setPlaces([]);
      return;
    }

    const debounce = setTimeout(async () => {
      // 키워드의 타입 별 함수 호출
      if (Array.isArray(keyword)) {
        if (!option) return;
        if (keyword[0] === '모든 카페') {
          searchForCategoryKeyword();
        } else {
          const results = await searchForMultipleKeywords(keyword);
          const fulfilledResults = results
            .filter(result => result.status === 'fulfilled')
            .flatMap(
              result => (result as PromiseFulfilledResult<PlaceType[]>).value,
            )
            .sort((a, b) => {
              return Number(a.distance) - Number(b.distance);
            });
          setPlaces(fulfilledResults);
        }
      } else {
        searchForSingleKeyword(keyword);
      }
    }, 500);

    return () => clearTimeout(debounce);
  }, [ps, keyword, option, searchForSingleKeyword, searchForMultipleKeywords]);

  return { places };
};

export default useSearchPlace;
