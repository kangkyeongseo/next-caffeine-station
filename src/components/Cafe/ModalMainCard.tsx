import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CafeType, MenuType } from '@/types';
import ModalCafeInfo from './ModalCafeInfo';
import ModalMenu from './ModalMenuList';
import ModalMainHeader from './ModalMainHeader';

interface ModalMainCardProps {
  menus: MenuType[];
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMainCard = ({
  menus,
  isMenuOpen,
  setIsMenuOpen,
  setIsAnimation,
}: ModalMainCardProps) => {
  const params = useSearchParams();
  const cafeName = params.get('name');
  const [cafe, setCafe] = useState<CafeType | null>(null);

  useEffect(() => {
    if (!cafeName) return;
    window.kakao.maps.load(() => {
      const places = new window.kakao.maps.services.Places();

      const callback = function (result: CafeType[], status: string) {
        if (status === window.kakao.maps.services.Status.OK) {
          setCafe(result[0]);
        }
      };

      places.keywordSearch(cafeName, callback);
    });
  }, [cafeName]);

  return (
    <div className='z-30 overflow-hidden rounded-md bg-white pb-4'>
      <ModalMainHeader cafePlaceName={cafe?.place_name} />
      <div className='space-y-2'>
        <ModalCafeInfo cafe={cafe} />
        <ModalMenu
          menus={menus}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          setIsAnimation={setIsAnimation}
        />
      </div>
    </div>
  );
};

export default ModalMainCard;
