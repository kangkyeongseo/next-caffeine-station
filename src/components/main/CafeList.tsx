'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { CafeType, CoordsType } from '@/types';
import Cafe from './Cafe';

interface CafeListProps {
  distance: number;
  coords: CoordsType | null;
}

const CafeList = ({ distance, coords }: CafeListProps) => {
  const { map } = useAppSelector(state => state.map);
  const [ps, setPs] = useState<any>(null);
  const [cafes, setCafes] = useState<CafeType[]>([]);
  const [markers, setMarkers] = useState<any[]>([]);

  const placesSearchCB = (data: CafeType[], status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setCafes(pre => [...pre, ...data]);
    } else {
      console.log('검색 실패', window.kakao.maps.services.Status);
    }
  };

  const displayMarker = (place: CafeType) => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });
    setMarkers(pre => [...pre, marker]);
  };

  const removeMarker = () => {
    for (let i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    setMarkers([]);
  };

  const keywordsSearch = (keywords: string[]) => {
    for (let i = 0; i < keywords.length; i++) {
      ps.keywordSearch(keywords[i], placesSearchCB, {
        location: new window.kakao.maps.LatLng(
          coords?.latitude,
          coords?.longitude,
        ),
        radius: distance * 1000,
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
      setCafes([]);
      keywordsSearch([
        '빽다방',
        '매가커피',
        '컴포즈커피',
        '매머드커피',
        '더벤티',
      ]);
    }
  }, [ps, map, distance]);

  useEffect(() => {
    if (cafes.length === 0) return;

    const timeoutId = setTimeout(() => {
      const bounds = new window.kakao.maps.LatLngBounds();

      removeMarker();
      for (let i = 0; i < cafes.length; i++) {
        displayMarker(cafes[i]);
        bounds.extend(new window.kakao.maps.LatLng(cafes[i].y, cafes[i].x));
      }

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다zx
      map.setBounds(bounds);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [cafes]);

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
