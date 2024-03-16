import React, { useEffect, useState } from 'react';
import ModalMap from './ModalMap';
import { useSearchParams } from 'next/navigation';
import { CafeType } from '@/types';
import { Phone, Place } from '@/image/svgs ';

const ModalCafeInfo = () => {
  const params = useSearchParams();
  const cafeName = params.get('name');
  const [cafe, setCafe] = useState<CafeType | null>(null);

  useEffect(() => {
    if (!cafeName) return;
    const places = new window.kakao.maps.services.Places();

    const callback = function (result: CafeType[], status: string) {
      if (status === window.kakao.maps.services.Status.OK) {
        setCafe(result[0]);
      }
    };

    places.keywordSearch(cafeName, callback);
  }, [cafeName]);

  if (!cafe) return;
  return (
    <div>
      <ModalMap
        coords={{ latitude: Number(cafe.y), longitude: Number(cafe.x) }}
      />
      <div className='flex flex-col'>
        <span className='text-xl font-bold'>{cafe.place_name}</span>
        <div className='flex gap-2'>
          <div className='flex'>
            <Place />
            <span className='font-light'>{cafe.road_address_name}</span>
          </div>
          <div className='flex'>
            <Phone />
            <span className='font-light'>{cafe.phone}</span>
          </div>
        </div>
        <div>{cafe.distance}m 떨어진 위치에 있습니다.</div>
      </div>
    </div>
  );
};

export default ModalCafeInfo;
