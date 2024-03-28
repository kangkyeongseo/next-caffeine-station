'use client';
import React, { useEffect, useState } from 'react';
import { BrandType, MenuType } from '@/types';
import AddMenuModal from './AddMenuModal';
import EditMenuModal from './EditMenuModal';
import MenuList from './MenuList';

interface MenuContainerProps {
  menus: MenuType[];
  brand: BrandType;
}

const MenuContainer = ({ menus, brand }: MenuContainerProps) => {
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
  }, [selectedCategory]);

  return (
    <div>
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
        />
      )}
      {isEditMenuModalOpen && selectedMenu && (
        <EditMenuModal
          menu={selectedMenu}
          setIsEditMenuModalOpen={setIsEditMenuModalOpen}
          brandId={brand.id}
        />
      )}
    </div>
  );
};

export default MenuContainer;
