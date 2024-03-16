'use client';
import React, { useEffect, useState } from 'react';
import ModalCafeInfo from './ModalCafeInfo';
import ModalMenu from './ModalMenu';
import { Close } from '@/image/svgs ';
import ModalMenuCard from './ModalMenuCard';

interface ModalContainerProps {
  cafeId: string;
}

const ModalContainer = ({ cafeId }: ModalContainerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    setIsAnimation(true);
  }, [isMenuOpen]);

  return (
    <div className='flex gap-4'>
      <div className=' flex'>
        <div
          className={`z-30 space-y-4 rounded-xl bg-white p-4 duration-300 ${isMenuOpen ? '-translate-x-4' : 'translate-x-[160px]'}`}
        >
          <div>
            <span>
              <Close />
            </span>
          </div>
          <ModalCafeInfo />
          <ModalMenu
            cafeId={cafeId}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setIsAnimation={setIsAnimation}
          />
        </div>
      </div>
      {isMenuOpen ? (
        <ModalMenuCard isAnimation={isAnimation} />
      ) : (
        <div className='w-[320px]'></div>
      )}

      {/* <div
        className={`h-[420px] w-[320px] rounded-xl bg-white transition-all ${isMenuOpen ? 'opacity-100' : 'translate-y-28 opacity-0'}`}
      ></div> */}
    </div>
  );
};

export default ModalContainer;
