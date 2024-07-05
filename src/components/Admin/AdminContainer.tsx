'use client';
import React from 'react';
import Link from 'next/link';
import useUser from '@/hooks/useUser';
import Unallowed from './Unallowed';
import CheckAuthority from './CheckAuthority';

const AdminContainer = () => {
  const { rule, isUserLoading } = useUser();
  return (
    <>
      {isUserLoading ? (
        <CheckAuthority />
      ) : rule === 'admin' ? (
        <div className='mx-auto mt-20 w-[600px] border-2'>
          <div className='bg-black/80 py-2 text-center'>
            <span className='text-white'>어드민 페이지</span>
          </div>
          <ul>
            <Link
              href={'/admin/brand'}
              className='block border-b-2 py-2 text-center hover:bg-gray-100'
            >
              브랜드
            </Link>
            <Link
              href={'/admin/menu'}
              className='block py-2 text-center hover:bg-gray-100'
            >
              매뉴
            </Link>
          </ul>
        </div>
      ) : (
        <Unallowed />
      )}
    </>
  );
};

export default AdminContainer;
