import React from 'react';
import ModalMap from './ModalMap';
import { PlaceType } from '@/types';
import ModalCafeDescription from './ModalCafeDescription';

interface ModalCafeInfoProps {
  cafe: PlaceType | null;
}

const ModalCafeInfo = ({ cafe }: ModalCafeInfoProps) => {
  return (
    <div className='space-y-4'>
      <ModalMap
        coords={{ latitude: Number(cafe?.y), longitude: Number(cafe?.x) }}
      />
      <ModalCafeDescription cafe={cafe} />
    </div>
  );
};

export default ModalCafeInfo;
