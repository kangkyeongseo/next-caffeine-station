'use client';
import { MenuType } from '@/types';
import React, { useState } from 'react';
import AddMenuModal from './AddMenuModal';
import EditMenuModal from './EditMenuModal';

interface MenuListContainerProps {
  menus: MenuType[];
  brandId: string;
}

const MenuListContainer = ({ menus, brandId }: MenuListContainerProps) => {
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

  return (
    <div>
      <ul>
        {menus.map(menu => (
          <li
            key={menu.id}
            onClick={() => onClickToOpenEditModal(menu)}
            className='cursor-pointer'
          >
            {menu.menuName}
          </li>
        ))}
      </ul>
      <button onClick={onClickToOpenAddModal}>메뉴 추가하기</button>
      {isAddMenuModalOpen && (
        <AddMenuModal
          setIsAddMenuModalOpen={setIsAddMenuModalOpen}
          brandId={brandId}
        />
      )}
      {isEditMenuModalOpen && selectedMenu && (
        <EditMenuModal
          menu={selectedMenu}
          setIsEditMenuModalOpen={setIsEditMenuModalOpen}
          brandId={brandId}
        />
      )}
    </div>
  );
};

export default MenuListContainer;
