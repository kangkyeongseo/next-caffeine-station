'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { CafeType } from '@/types';
import jsxToString from '@/libs/client/jsxToString';
import { ChevrongLeft, ChevrongRight } from '@/image/svgs ';
import CafeItem from './CafeItem';
import CafeOverlay from './CafeOverlay';
import Provider from '../Provider';
import CafeFilter from './CafeFilter';

const CafeList = () => {
  const { map, coords } = useAppSelector(state => state.map);
  const { keywords } = useAppSelector(state => state.filter);
  const { distance } = useAppSelector(state => state.filter);

  const [ps, setPs] = useState<any>(null);
  const [cafes, setCafes] = useState<CafeType[]>([]);
  const [filteringCafes, setFilteringCafes] = useState<CafeType[]>([]);

  const [overlays, setOverlays] = useState<any[]>([]);
  const [isPsReady, setIsPsReady] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const placesSearchCB = (data: CafeType[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setCafes(pre => [...pre, ...data]);
    } else {
      console.log('검색 실패', window.kakao.maps.services.Status);
    }
  };

  const displayMarker = (place: CafeType) => {
    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(place.y, place.x),
      content: jsxToString(
        <Provider>
          <CafeOverlay cafe={place} />
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
    setOverlays([]);
  };

  const keywordsSearch = (keywords: string[]) => {
    for (let i = 0; i < keywords.length; i++) {
      ps.keywordSearch(keywords[i], placesSearchCB, {
        location: new window.kakao.maps.LatLng(
          coords?.latitude,
          coords?.longitude,
        ),
        radius: distance,
      });
    }
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
    keywordsSearch(keywords);
  }, [isPsReady, distance, keywords, coords]);

  useEffect(() => {
    if (cafes.length === 0) return;

    const timeoutId = setTimeout(() => {
      const bounds = new window.kakao.maps.LatLngBounds();

      removeMarker();
      for (let i = 0; i < cafes.length; i++) {
        displayMarker(cafes[i]);
        bounds.extend(new window.kakao.maps.LatLng(cafes[i].y, cafes[i].x));
      }
      bounds.extend(
        new window.kakao.maps.LatLng(coords?.latitude, coords?.longitude),
      );

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다zx
      map.setBounds(bounds);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [cafes]);

  useEffect(() => {
    setFilteringCafes(
      cafes.sort((a, b) => {
        return Number(a.distance) - Number(b.distance);
      }),
    );
  }, [cafes]);

  return (
    <div
      className={`absolute right-0 top-0 z-10 h-full w-80 bg-white shadow-md duration-200 ${isOpen ? 'translate-x-0' : 'translate-x-80'}`}
    >
      <CafeFilter cafes={cafes} setFilteringCafes={setFilteringCafes} />
      <ul className='hide-scroll h-full overflow-y-scroll'>
        {filteringCafes.length === 0 && (
          <li className='flex items-center justify-center p-4 text-black/30'>
            <span>조건에 맞는 카페가 없습니다.</span>
          </li>
        )}
        {filteringCafes.map(cafe => (
          <CafeItem key={cafe.id} cafe={cafe} />
        ))}
      </ul>
      <div
        className='absolute left-[-25px] top-[50%] flex h-10 w-5 cursor-pointer rounded-md bg-white shadow-md'
        onClick={() => setIsOpen(pre => !pre)}
      >
        {isOpen ? <ChevrongRight /> : <ChevrongLeft />}
      </div>
    </div>
  );
};

export default CafeList;
