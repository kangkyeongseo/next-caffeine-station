import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsMapLoading } from '@/redux/slices/mapSlice';
import { BrandType, CafeType } from '@/types';
import Provider from '@/components/Provider';
import jsxToString from '@/libs/client/jsxToString';
import CafeOverlay from '../CafeOverlay';

interface MarkerManagerProps {
  brands: BrandType[];
  cafes: CafeType[];
  isPsReady: boolean;
}

const MarkerManager = ({ brands, cafes, isPsReady }: MarkerManagerProps) => {
  const dispatch = useAppDispatch();
  const { map, coords } = useAppSelector(state => state.map);
  const { distance } = useAppSelector(state => state.filter);

  const [marker, setMarker] = useState<any>(null);
  const [overlays, setOverlays] = useState<any[]>([]);

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

  return null;
};

export default MarkerManager;
