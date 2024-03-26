'use client';
import React, { useEffect, useState } from 'react';
import ModalMenuCard from './ModalMenuCard';
import ModalMainCard from './ModalMainCard';

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
    <div className='relative'>
      <ModalMainCard
        cafeId={cafeId}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        setIsAnimation={setIsAnimation}
      />
      {isMenuOpen && <ModalMenuCard isAnimation={isAnimation} />}
    </div>
  );
};

export default ModalContainer;
