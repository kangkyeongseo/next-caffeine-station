import ModalContainer from '@/components/Cafe/ModalContainer';
import React from 'react';

function CafeDetail({ params }: { params: { id: string } }) {
  return (
    <div className='absolute right-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-black/80'>
      <ModalContainer cafeId={params.id} />
    </div>
  );
}

export default CafeDetail;
