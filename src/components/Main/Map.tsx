import React, { useEffect, useRef, useState } from 'react';
import { setIsMapLoading, setMap } from '@/redux/slices/mapSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import MapLoading from '@/components/MapLoading';
import { BrandType, CafeType } from '@/types';
import jsxToString from '@/libs/client/jsxToString';
import CafeOverlay from './CafeOverlay';
import Provider from '../Provider';

interface MapProps {
  ps: any;
  brands: BrandType[];
  cafes: CafeType[];
  setCafes: React.Dispatch<React.SetStateAction<CafeType[]>>;
}

const Map = ({ ps, brands, cafes, setCafes }: MapProps) => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);

  const { map, coords, isMapLoading } = useAppSelector(state => state.map);
  const { keywords, distance } = useAppSelector(state => state.filter);

  const [marker, setMarker] = useState<any>(null);
  const [overlays, setOverlays] = useState<any[]>([]);
  const [isPsReady, setIsPsReady] = useState(false);

  const placesSearchCB = (data: CafeType[], status: string) => {
    return new Promise<CafeType[]>((resolve, reject) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        reject();
      }
    });
  };

  const displayMarker = (place: CafeType) => {
    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(place.y, place.x),
      content: jsxToString(
        <Provider>
          <CafeOverlay cafe={place} brands={brands} />
        </Provider>,
      ),
    });
    overlay.setMap(map);
    setOverlays(pre => [...pre, overlay]);
  };

  const removeMarker = () => {
    for (let i = 0; i < overlays.length; i++) {
      overlays[i].setMap(null);
    }
    if (marker) {
      marker.setMap(null);
    }

    setOverlays([]);
    setMarker(null);
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
    if (cafes.length !== 0) {
      setCafes([]);
    }

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

    fetchData();
    dispatch(setIsMapLoading(true));
  }, [isPsReady, distance, keywords, coords]);

  useEffect(() => {
    if (!isPsReady) return;
    removeMarker();
    const bounds = new window.kakao.maps.LatLngBounds();
    for (let i = 0; i < cafes.length; i++) {
      displayMarker(cafes[i]);
    }

    bounds.extend(
      new window.kakao.maps.LatLng(
        (coords?.latitude ? coords.latitude : 0) + distance / 1110000,
        coords?.longitude,
      ),
    );
    bounds.extend(
      new window.kakao.maps.LatLng(
        (coords?.latitude ? coords.latitude : 0) - distance / 1110000,
        coords?.longitude,
      ),
    );
    bounds.extend(
      new window.kakao.maps.LatLng(
        coords?.latitude,
        (coords?.longitude ? coords?.longitude : 0) + distance / 111320,
      ),
    );
    bounds.extend(
      new window.kakao.maps.LatLng(
        coords?.latitude,
        (coords?.longitude ? coords?.longitude : 0) - distance / 111320,
      ),
    );

    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(
        coords?.latitude,
        coords?.longitude,
      ),
    });
    setMarker(marker);

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
    dispatch(setIsMapLoading(false));
  }, [isPsReady, cafes]);

  useEffect(() => {
    if (!coords) return;
    if (!map) {
      window.kakao.maps.load(() => {
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(
            coords.latitude,
            coords.longitude,
          ), //지도의 중심좌표.
          level: 2, //지도의 레벨(확대, 축소 정도)
        };
        const newMap = new window.kakao.maps.Map(mapRef.current, options);
        dispatch(setMap(newMap));
      });
    }
  }, [coords]);

  return (
    <div className='relative flex items-center justify-center'>
      {isMapLoading && <MapLoading />}
      <div
        ref={mapRef}
        className={`aspect-square w-full md:h-screen md:w-screen`}
      ></div>
    </div>
  );
};

export default Map;
