'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { CafeType, CoordsType } from '@/types';
import jsxToString from '@/libs/client/jsxToString';
import Cafe from './Cafe';
import CafeOverlay from './CafeOverlay';

interface CafeListProps {
  distance: number;
  kerwords: string[];
  coords: CoordsType | null;
}

const CafeList = ({ distance, kerwords, coords }: CafeListProps) => {
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
    // const marker = new window.kakao.maps.Marker({
    //   map,
    //   position: new window.kakao.maps.LatLng(place.y, place.x),
    // });
    // setMarkers(pre => [...pre, marker]);
    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(place.y, place.x),
      content: jsxToString(<CafeOverlay cafe={place} />),
      removavle: false,
    });
    overlay.setMap(map);
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
      keywordsSearch(kerwords);
    }
  }, [ps, map, distance, kerwords]);

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
