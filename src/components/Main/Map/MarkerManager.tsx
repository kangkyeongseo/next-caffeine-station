import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setIsMapLoading } from '@/redux/slices/mapSlice';
import { setContent, setIsOpen } from '@/redux/slices/toastSlice';
import { BrandType, MarkerType, OverlayType, PlaceType } from '@/types';
import Provider from '@/components/Provider';
import jsxToString from '@/libs/client/jsxToString';
import CafeOverlay from '../CafeOverlay';

interface MarkerManagerProps {
  brands: BrandType[];
  cafes: PlaceType[];
  isSearchReady: boolean;
}

const MarkerManager = ({
  brands,
  cafes,
  isSearchReady,
}: MarkerManagerProps) => {
  const dispatch = useAppDispatch();
  const { map, coords } = useAppSelector(state => state.map);
  const { distance, keywords } = useAppSelector(state => state.filter);

  const [marker, setMarker] = useState<MarkerType>(null);
  const [overlays, setOverlays] = useState<OverlayType[]>([]);

  const displayMarker = () => {
    const marker = new window.kakao.maps.Marker({
      map,
      position: new window.kakao.maps.LatLng(
        coords?.latitude,
        coords?.longitude,
      ),
    });
    setMarker(marker);
  };

  const displayOverlay = (place: PlaceType) => {
    const overlayContent = (
      <Provider>
        <CafeOverlay cafe={place} brands={brands} />
      </Provider>
    );

    const overlay = new window.kakao.maps.CustomOverlay({
      position: new window.kakao.maps.LatLng(place.y, place.x),
      content: jsxToString(overlayContent),
    });
    overlay.setMap(map);
    setOverlays(pre => [...pre, overlay]);
  };

  const removeMarker = () => {
    if (marker) {
      marker.setMap(null);
    }
    setMarker(null);
  };

  const removeOverlay = () => {
    for (let i = 0; i < overlays.length; i++) {
      overlays[i].setMap(null);
    }
    setOverlays([]);
  };

  useEffect(() => {
    if (!isSearchReady || !coords) return;
    if (keywords.length === 0) return;

    removeMarker();
    removeOverlay();

    displayMarker();
    cafes.forEach(cafe => displayOverlay(cafe));

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    const bounds = new window.kakao.maps.LatLngBounds();

    const latAdjustments = [distance / 1110000, -distance / 1110000, 0, 0];
    const lngAdjustments = [0, 0, distance / 111320, -distance / 111320];

    latAdjustments.forEach((letAdjustment, index) => {
      bounds.extend(
        new window.kakao.maps.LatLng(
          coords.latitude + letAdjustment,
          coords.longitude + lngAdjustments[index],
        ),
      );
    });

    map.setBounds(bounds);

    // 지도 재설정 후 지도 로딩과 토스트 메세지를 설정합니다.
    dispatch(setIsMapLoading(false));
    dispatch(setIsOpen(true));
    if (cafes.length > 0) {
      dispatch(setContent('주변 카페를 검색했습니다.'));
    } else {
      dispatch(setContent('조건에 만족한 카페가 없습니다.'));
    }
  }, [isSearchReady, cafes]);

  return null;
};

export default MarkerManager;
