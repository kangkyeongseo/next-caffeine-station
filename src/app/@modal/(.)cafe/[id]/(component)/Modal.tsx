'use client';
import { useRouter } from 'next/navigation';
import React, { useRef } from 'react';

const Modal = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const handleOverlayClick = (event: React.MouseEvent<HTMLElement>) => {
    const { target } = event;
    if (target === overlayRef.current) {
      router.back();
    }
  };
  return (
    <div
      className='absolute right-0 top-0 z-[100] flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.8)]'
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      {children}
    </div>
  );
};

export default Modal;
