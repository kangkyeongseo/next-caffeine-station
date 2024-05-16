'use client';
import React from 'react';
import Link from 'next/link';
import { BrandType } from '@/types';
import useUser from '@/hooks/useUser';
import Unallowed from '../Unallowed';

interface MenuContainerProps {
  brands: BrandType[];
}

const MenuContainer = ({ brands }: MenuContainerProps) => {
  const { rule, isUserLoading } = useUser();
  return (
    <>
      {isUserLoading ? null : rule === 'admin' ? (
        <div className='mx-auto mt-20 min-h-[700px] w-[600px] border-2'>
          <div className='bg-black/80 py-2 text-center'>
            <span className='text-white'>메뉴</span>
          </div>
          <ul>
            {brands.map(brand => (
              <li key={brand.id}>
                <Link
                  href={`/admin/menu/${brand.id}`}
                  className='block border-b-2 py-2 text-center hover:bg-gray-100'
                >
                  {brand.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Unallowed />
      )}
    </>
  );
};

export default MenuContainer;
