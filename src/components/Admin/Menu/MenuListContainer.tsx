'use client';
import { MenuType } from '@/types';
import React, { useState } from 'react';
import AddMenuModal from './AddMenuModal';

interface MenuListContainerProps {
  menus: MenuType[];
  brandId: string;
}

const MenuListContainer = ({ menus, brandId }: MenuListContainerProps) => {
  const [isAddMenuModalOpen, setIsAddMenuModalOpen] = useState(false);

  const onClickToOpenAddModal = () => {
    setIsAddMenuModalOpen(true);
  };

  return (
    <div>
      <ul>
        {menus.map(menu => (
          <li key={menu.id}>{menu.menuName}</li>
        ))}
      </ul>
      <button onClick={onClickToOpenAddModal}>메뉴 추가하기</button>
      {isAddMenuModalOpen && (
        <AddMenuModal
          setIsAddMenuModalOpen={setIsAddMenuModalOpen}
          brandId={brandId}
        />
      )}
    </div>
  );
};

export default MenuListContainer;
