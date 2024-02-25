'use client';
import React, { useEffect, useState } from 'react';
import { menus } from '@/content';

interface ModalMenuProps {
  cafeId: string;
}

const ModalMenu = ({ cafeId }: ModalMenuProps) => {
  const brandMenus = menus.find(menu => {
    if (menu.bradnId === Number(cafeId)) {
      return menu;
    } else {
      return null;
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [selectedMenus, setSelectedMenus] = useState<any[]>([]);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (!brandMenus) return;
    setSelectedMenus(
      brandMenus.menu.filter((menu: any) => {
        if (menu.category === selectedCategory) {
          return menu;
        }
      }),
    );
  }, [selectedCategory]);

  return (
    <div>
      <span>메뉴</span>
      <nav>
        <span onClick={() => handleNavClick('coffee')}>커피</span>
        <span onClick={() => handleNavClick('beverage')}>음료</span>
        <span onClick={() => handleNavClick('dessert')}>디저트</span>
      </nav>
      <ul className='list-none space-y-2'>
        {selectedMenus?.map(menu => (
          <li
            key={menu.menuName}
            className='flex cursor-pointer items-center justify-between rounded-md border px-6 py-4'
          >
            <div>
              <span>{menu.menuName}</span>
              <div>
                {menu.types?.map((type: any) => <span key={type}>{type}</span>)}
              </div>
            </div>
            <div>
              {menu.kind.map((kind: any) => (
                <span key={kind.type}>
                  {kind.type === 'hot'
                    ? `HOT ${kind.price}원`
                    : `ICE ${kind.price}원`}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalMenu;
