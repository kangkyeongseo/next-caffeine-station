'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Close } from '@/image/svgs ';

const LoginHeader = () => {
  const router = useRouter();
  return (
    <div className='grid h-[45px] grid-cols-[1fr,10fr,1fr] items-center justify-center bg-emerald-600 px-4 text-white'>
      <span className='col-start-2 col-end-3 text-center md:text-xl'>
        로그인
      </span>
      <span
        className='cursor-pointer justify-self-end'
        onClick={() => router.back()}
      >
        <Close />
      </span>
    </div>
  );
};

export default LoginHeader;
