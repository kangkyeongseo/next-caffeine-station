import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { PlaceType, MenuType, ReviewType } from '@/types';
import ModalCafeInfo from './ModalCafeInfo';
import ModalMenu from './ModalMenuList';
import ModalMainHeader from './ModalMainHeader';
import CafeReviewContainer from './CafeReviewContainer';

interface ModalMainCardProps {
  id: string;
  reviewId: string | undefined;
  menus: MenuType[];
  review: ReviewType | null;
  type: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnimation: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalMainCard = ({
  id,
  reviewId,
  menus,
  review,
  type,
  isMenuOpen,
  setIsMenuOpen,
  setIsAnimation,
}: ModalMainCardProps) => {
  const params = useSearchParams();
  const cafeName = params.get('name');

  const [cafe, setCafe] = useState<PlaceType | null>(null);

  useEffect(() => {
    if (!cafeName) return;
    window.kakao.maps.load(() => {
      const places = new window.kakao.maps.services.Places();

      const callback = function (result: PlaceType[], status: string) {
        if (status === window.kakao.maps.services.Status.OK) {
          setCafe(result[0]);
        }
      };

      places.keywordSearch(cafeName, callback);
    });
  }, [cafeName]);

  return (
    <div className='z-30 h-full w-full overflow-hidden rounded-md bg-white pb-4 lg:w-[500px]'>
      <ModalMainHeader cafePlaceName={cafe?.place_name} />
      <div className='space-y-2'>
        <ModalCafeInfo cafe={cafe} />
        {type === 'brand' && (
          <ModalMenu
            menus={menus}
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
            setIsAnimation={setIsAnimation}
          />
        )}
        {type === 'all-cafe' && (
          <CafeReviewContainer id={id} reviewId={reviewId} review={review} />
        )}
      </div>
    </div>
  );
};

export default ModalMainCard;
