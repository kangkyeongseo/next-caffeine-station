import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setMap } from '@/redux/slices/mapSlice';

const Map = () => {
  const dispatch = useAppDispatch();
  const mapRef = useRef<HTMLDivElement>(null);
  const { map, coords } = useAppSelector(state => state.map);

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
  return <div ref={mapRef} className={`h-screen w-screen`}></div>;
};

export default Map;
