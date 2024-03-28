import { MenuType } from '@/types';
import React from 'react';

interface MenuListProps {
  menus: MenuType[];
  onClickToOpenEditModal: (menu: MenuType) => void;
}

const MenuList = ({ menus, onClickToOpenEditModal }: MenuListProps) => {
  return (
    <ul>
      {menus.map(menu => (
        <li
          key={menu.id}
          onClick={() => onClickToOpenEditModal(menu)}
          className='cursor-pointer border-b-2 py-2 text-center hover:bg-gray-100'
        >
          {menu.menuName}
        </li>
      ))}
    </ul>
  );
};

export default MenuList;
