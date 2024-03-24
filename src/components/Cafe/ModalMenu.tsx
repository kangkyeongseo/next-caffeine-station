import React, { useEffect, useState } from 'react';
import { menus } from '@/content';
import { MenuType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { setMenu } from '@/redux/slices/menuSlice';

interface ModalMenuProps {
  cafeId: string;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMenu = ({
  cafeId,
  isMenuOpen,
  setIsMenuOpen,
  setIsAnimation,
}: ModalMenuProps) => {
  const dispatch = useAppDispatch();
  const { menu } = useAppSelector(state => state.menu);
  const brandMenus = menus.find(menu => {
    if (menu.bradnId === Number(cafeId)) {
      return menu;
    } else {
      return null;
    }
  });
  const [selectedCategory, setSelectedCategory] = useState('coffee');
  const [selectedMenus, setSelectedMenus] = useState<MenuType[]>([]);

  const handleNavClick = (category: string) => {
    setSelectedCategory(category);
  };

  const handleMenuClick = (clickedMenu: MenuType) => {
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      dispatch(setMenu(clickedMenu));
    } else if (clickedMenu.menuName === menu.menuName) {
      setIsAnimation(false);
      setTimeout(() => {
        setIsMenuOpen(false);
      }, 300);
    } else {
      dispatch(setMenu(clickedMenu));
    }
  };

  useEffect(() => {
    if (!brandMenus) return;
    setSelectedMenus(
      brandMenus.menu.filter(item => {
        if (item.category === selectedCategory) {
          return item;
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
            onClick={() => handleMenuClick(menu)}
          >
            <div>
              <span>{menu.menuName}</span>
              <div>
                {menu.types?.map((type: any) => <span key={type}>{type}</span>)}
              </div>
            </div>
            <div>
              {menu.nutritionalInfos.map((info: any) => (
                <span key={info.type}>
                  {info.type === 'hot'
                    ? `HOT ${info.price}원`
                    : `ICE ${info.price}원`}
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
