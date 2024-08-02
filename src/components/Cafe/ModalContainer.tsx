'use client';
import React, { useEffect, useState } from 'react';
import ModalMenuCard from './ModalMenuCard';
import ModalMainCard from './ModalMainCard';
import { MenuType } from '@/types';

interface ModalContainerProps {
  menus: MenuType[];
  isAllCafeMode: boolean;
}

const ModalContainer = ({ menus, isAllCafeMode }: ModalContainerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    setIsAnimation(true);
  }, [isMenuOpen]);

  return (
    <div className='relative flex h-[90%] w-[90%] items-center justify-center lg:w-fit'>
      <ModalMainCard
        menus={menus}
        isAllCafeMode={isAllCafeMode}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsAnimation={setIsAnimation}
      />
      {isMenuOpen && !isAllCafeMode && (
        <ModalMenuCard isAnimation={isAnimation} />
      )}
    </div>
  );
};

export default ModalContainer;
