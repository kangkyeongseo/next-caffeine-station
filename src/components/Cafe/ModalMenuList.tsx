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

const ModalMenuList = ({
  cafeId,
  isMenuOpen,
  setIsMenuOpen,
  setIsAnimation,
}: ModalMenuProps) => {
  const dispatch = useAppDispatch();
  const { menu: selectedMenu } = useAppSelector(state => state.menu);
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
    } else if (clickedMenu.menuName === selectedMenu.menuName) {
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
    <div className='flex flex-col gap-2'>
      <div className='space-y-2 px-4'>
        <span className='font-bold'>메뉴</span>
        <nav>
          <span
            onClick={() => handleNavClick('coffee')}
            className={`cursor-pointer  rounded-md px-4 py-1 ${selectedCategory === 'coffee' ? 'bg-emerald-600 text-white' : 'bg-white'}`}
          >
            커피
          </span>
          <span
            onClick={() => handleNavClick('beverage')}
            className={`cursor-pointer rounded-md px-4 py-1 ${selectedCategory === 'beverage' ? 'bg-emerald-600 text-white' : 'bg-white'}`}
          >
            음료
          </span>
          <span
            onClick={() => handleNavClick('dessert')}
            className={`cursor-pointer rounded-md px-4 py-1 ${selectedCategory === 'dessert' ? 'bg-emerald-600 text-white' : 'bg-white'}`}
          >
            디저트
          </span>
        </nav>
      </div>
      <ul className='hide-scroll mt-2 h-[300px] list-none overflow-y-scroll border-t'>
        {selectedMenus?.map(menu => (
          <li
            key={menu.menuName}
            className='flex cursor-pointer items-center justify-between rounded-md border-b p-4 hover:bg-gray-100'
            onClick={() => handleMenuClick(menu)}
          >
            <div className='flex flex-col gap-[2px]'>
              <div className='flex items-center gap-1'>
                <span className='text-sm font-bold'>{menu.menuName}</span>
                <div className='space-x-1 text-[10px] text-white'>
                  {menu.types.map((type: string) => (
                    <span
                      key={type}
                      className={`min-w-[32px] rounded-[4px] px-1 py-[2px] ${type === 'hot' ? 'bg-red-500' : type === 'ice' ? 'bg-blue-500' : 'bg-emerald-600'}`}
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </div>
              <span className='text-xs font-light text-gray-800'>
                {menu.description.length <= 32
                  ? menu.description
                  : menu.description.substring(0, 32).concat('...')}
              </span>
            </div>
            <div className='flex flex-col items-end gap-2'>
              <div className='space-x-1 text-xs text-gray-800'>
                {menu.sizes.map((size: string) => (
                  <span
                    key={size}
                    className='min-w-[52px] rounded-[4px] border px-1 py-[2px]'
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ModalMenuList;
