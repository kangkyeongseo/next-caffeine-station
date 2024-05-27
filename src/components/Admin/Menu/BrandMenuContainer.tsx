'use client';
import React, { useEffect, useState } from 'react';
import { BrandType, MenuType } from '@/types';
import MenuList from './MenuList';
import useUser from '@/hooks/useUser';
import Unallowed from '../Unallowed';
import dynamic from 'next/dynamic';

interface BrandMenuContainerProps {
  menus: MenuType[];
  brand: BrandType;
}

const AddMenuModal = dynamic(() => import('./AddMenuModal'));
const EditMenuModal = dynamic(() => import('./EditMenuModal'));

const BrandMenuContainer = ({ menus, brand }: BrandMenuContainerProps) => {
  const { rule, isUserLoading } = useUser();
  const [filteredMenus, setFilteredMenus] = useState<MenuType[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [selectedMenu, setSelectedMenu] = useState<MenuType | null>(null);
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);
  const [isEditMenuModalOpen, setIsEditMenuModalOpen] = useState(false);

  const onClickToOpenEditModal = (menu: MenuType) => {
    setIsEditMenuModalOpen(true);
    setSelectedMenu(menu);
  };

  const onClickToOpenAddModal = () => {
    setIsAddMenuModalOpen(true);
  };

  useEffect(() => {
    setFilteredMenus(menus.filter(menu => menu.category === selectedCategory));
  }, [selectedCategory, menus]);

  return (
    <>
      {isUserLoading ? null : rule === 'admin' ? (
        <div className='flex h-screen w-screen justify-center'>
          <div className='mt-20 h-[700px] w-[600px] overflow-hidden border-2'>
            <div className='relative bg-black/80 py-2 text-center'>
              <span className='text-white'>{brand.name}</span>
              <button
                onClick={onClickToOpenAddModal}
                className='absolute right-4 top-[50%] translate-y-[-50%] rounded-sm bg-emerald-600 px-2 py-[2px] text-sm text-white hover:bg-emerald-700'
              >
                메뉴 추가하기
              </button>
            </div>
            <ul className='grid grid-cols-3'>
              <li
                className={`w-full border-r-2 bg-gray-500 py-2 text-center text-white ${selectedCategory === 'coffee' ? 'bg-gray-700' : 'hover:bg-gray-600'}`}
                onClick={() => setSelectedCategory('coffee')}
              >
                커피
              </li>
              <li
                className={`w-full border-r-2 bg-gray-500 py-2 text-center text-white ${selectedCategory === 'beverage' ? 'bg-gray-700' : 'hover:bg-gray-600'}`}
                onClick={() => setSelectedCategory('beverage')}
              >
                음료
              </li>
              <li
                className={`w-full bg-gray-500 py-2 text-center text-white ${selectedCategory === 'dessert' ? 'bg-gray-700' : 'hover:bg-gray-600'}`}
                onClick={() => setSelectedCategory('dessert')}
              >
                디저트
              </li>
            </ul>
            <MenuList
              menus={filteredMenus}
              onClickToOpenEditModal={onClickToOpenEditModal}
            />
            {isAddMenuModalOpen && (
              <AddMenuModal
                setIsAddMenuModalOpen={setIsAddMenuModalOpen}
                brandId={brand.id}
                rule={rule}
              />
            )}
            {isEditMenuModalOpen && selectedMenu && (
              <EditMenuModal
                menu={selectedMenu}
                setIsEditMenuModalOpen={setIsEditMenuModalOpen}
                rule={rule}
              />
            )}
          </div>
        </div>
      ) : (
        <Unallowed />
      )}
    </>
  );
};

export default BrandMenuContainer;
