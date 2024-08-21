'use client';
import React, { useEffect, useState } from 'react';
import ModalMenuCard from './ModalMenuCard';
import ModalMainCard from './ModalMainCard';
import { MenuType } from '@/types';
import { useSearchParams } from 'next/navigation';

interface ModalContainerProps {
  id: string;
  menus: MenuType[];
}

const ModalContainer = ({ id, menus }: ModalContainerProps) => {
  const params = useSearchParams();
  const type = params.get('type');

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimation, setIsAnimation] = useState(false);

  useEffect(() => {
    if (!isMenuOpen) return;
    setIsAnimation(true);
  }, [isMenuOpen]);

  return (
    <div className='relative flex h-[90%] w-[90%] items-center justify-center lg:w-fit'>
      <ModalMainCard
        id={id}
        menus={menus}
        type={type}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsAnimation={setIsAnimation}
      />
      {isMenuOpen && type === 'brand' && (
        <ModalMenuCard isAnimation={isAnimation} />
      )}
    </div>
  );
};

export default ModalContainer;
