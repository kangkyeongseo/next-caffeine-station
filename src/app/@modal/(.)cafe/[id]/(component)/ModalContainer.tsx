import React from 'react';
import ModalMap from './ModalMap';
import ModalMenu from './ModalMenu';

interface ModalContainerProps {
  cafeId: string;
}

const ModalContainer = ({ cafeId }: ModalContainerProps) => {
  return (
    <div>
      <ModalMap />
      {/* <div className='flex flex-col'>
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
  <div> */}
      <ModalMenu cafeId={cafeId} />
    </div>
  );
};

export default ModalContainer;
