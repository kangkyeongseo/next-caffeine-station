'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { CafeType } from '@/types';
import Cafe from './Cafe';

const CafeList = () => {
  const { map } = useAppSelector(state => state.map);
  const [ps, setPs] = useState<any>(null);
  const [cafes, setCafes] = useState<CafeType[]>([]);

  const placesSearchCB = (data: CafeType[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setCafes(pre => [...pre, ...data]);
      const bounds = new window.kakao.maps.LatLngBounds();
      for (let i = 0; i < data.length; i++) {
        displayMarker(data[i]);
        bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
      map.setBounds(bounds);
    } else {
      console.log('검색 실패', window.kakao.maps.services.Status);
    }
  };

  const displayMarker = (place: CafeType) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
  };

  const keywordsSearch = (keywords: string[]) => {
    keywords.map(keyword => {
      ps.keywordSearch(keyword, placesSearchCB, {
        useMapCenter: true,
        radius: 3000,
      });
    });
  };

  useEffect(() => {
    window.kakao.maps.load(() => {
      setPs(new window.kakao.maps.services.Places());
    });
  }, []);

  useEffect(() => {
    if (ps && map) {
      ps.setMap(map);
      keywordsSearch(['빽다방', '메가커피', '컴포즈커피']);
    }
  }, [ps, map]);

  return (
    <div>
      <span>CafeList</span>
      {cafes.map(cafe => (
        <Cafe key={cafe.id} cafe={cafe} />
      ))}
    </div>
  );
};

export default CafeList;
