'use client';
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '@/redux/store';
import { CafeType, CoordsType } from '@/types';
import jsxToString from '@/libs/client/jsxToString';
import Cafe from './Cafe';
import CafeOverlay from './CafeOverlay';
import Provider from '../Provider';
import CafeModal from '@/components/main/cafeModal/CafeModal';

interface CafeListProps {
  coords: CoordsType | null;
}

const CafeList = ({ coords }: CafeListProps) => {
  const { map } = useAppSelector(state => state.map);
  const { keywords } = useAppSelector(state => state.filter);
  const { distance } = useAppSelector(state => state.filter);
  const [ps, setPs] = useState<any>(null);
  const [selectedCafe, setSelectedCafe] = useState<CafeType | null>(null);
  const [cafes, setCafes] = useState<CafeType[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // const [markers, setMarkers] = useState<any[]>([]);
  const [overlay, setOverlay] = useState<any[]>([]);
  const [isPsReady, setIsPsReady] = useState(false);

  const handleListClick = (cafe: CafeType) => {
    setSelectedCafe(cafe);
    setIsModalOpen(true);
  };

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
      content: jsxToString(
        <Provider>
          <CafeOverlay cafe={place} />
        </Provider>,
      ),
      removavle: false,
    });
    overlay.setMap(map);
    setOverlay(pre => [...pre, overlay]);
  };

  const removeMarker = () => {
    // for (let i = 0; i < markers.length; i++) {
    //   markers[i].setMap(null);
    // }
    // setMarkers([]);
    for (let i = 0; i < overlay.length; i++) {
      overlay[i].setMap(null);
    }
    setOverlay([]);
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
    if (isPsReady) {
      setCafes([]);
      keywordsSearch(keywords);
    }
  }, [isPsReady, distance, keywords]);

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
    <>
      <div className='absolute right-0 top-0 z-10'>
        <span>CafeList</span>
        <ul>
          {cafes.map(cafe => (
            <li key={cafe.id} onClick={() => handleListClick(cafe)}>
              <Cafe cafe={cafe} />
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && (
        <CafeModal cafe={selectedCafe} setIsModalOpen={setIsModalOpen} />
      )}
    </>
  );
};

export default CafeList;
