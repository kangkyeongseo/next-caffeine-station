'use client';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { BrandType, CafeType } from '@/types';
import jsxToString from '@/libs/client/jsxToString';
import { ChevrongLeft, ChevrongRight } from '@/image/svgs ';
import CafeOverlay from '../CafeOverlay';
import Provider from '../../Provider';
import CafeFilter from './CafeFilter';
import { setIsMapLoading } from '@/redux/slices/mapSlice';
import CafeList from './CafeList';

interface CafeSideBarProps {
  brands: BrandType[];
}

const CafeSideBar = ({ brands }: CafeSideBarProps) => {
  const dispatch = useAppDispatch();
  const { map, coords } = useAppSelector(state => state.map);
  const { keywords, distance } = useAppSelector(state => state.filter);

  const [ps, setPs] = useState<any>(null);
  const [cafes, setCafes] = useState<CafeType[]>([]);
  const [filteringCafes, setFilteringCafes] = useState<CafeType[]>([]);

  const [marker, setMarker] = useState<any>(null);
  const [overlays, setOverlays] = useState<any[]>([]);
  const [isPsReady, setIsPsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const placesSearchCB = (data: CafeType[], status: string) => {
    return new Promise<CafeType[]>((resolve, reject) => {
      if (status === window.kakao.maps.services.Status.OK) {
        resolve(data);
      } else {
        dispatch(setIsMapLoading(false));
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
    window.kakao.maps.load(() => {
      setPs(new window.kakao.maps.services.Places());
    });
  }, []);

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
      setFilteringCafes(fulfilledResults);
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

  return (
    <div
      className={`z-10 h-full w-full bg-white pb-5 duration-200 md:absolute md:right-0 md:top-0 md:w-80 md:pb-10 md:shadow-md ${isOpen ? 'translate-x-0' : 'translate-x-80'}`}
    >
      <CafeFilter cafes={cafes} setFilteringCafes={setFilteringCafes} />
      <CafeList filteringCafes={filteringCafes} brands={brands} />
      <div
        className='absolute left-[-25px] top-[50%] hidden h-10 w-5 cursor-pointer rounded-md bg-white shadow-md md:flex'
        onClick={() => setIsOpen(pre => !pre)}
      >
        {isOpen ? <ChevrongRight /> : <ChevrongLeft />}
      </div>
    </div>
  );
};

export default CafeSideBar;
