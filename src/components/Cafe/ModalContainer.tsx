'use client';
import React, { useEffect, useState } from 'react';
import ModalMenuCard from './ModalMenuCard';
import ModalMainCard from './ModalMainCard';
import { MenuType } from '@/types';

interface ModalContainerProps {
  menus: MenuType[];
}

const ModalContainer = ({ menus }: ModalContainerProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    setIsAnimation(true);
  }, [isMenuOpen]);

  return (
    <div className='relative'>
      <ModalMainCard
        menus={menus}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsAnimation={setIsAnimation}
      />
      {isMenuOpen && <ModalMenuCard isAnimation={isAnimation} />}
    </div>
  );
};

export default ModalContainer;
