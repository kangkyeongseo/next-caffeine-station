import { useEffect, useState } from 'react';
import {
  setIsEnterLink,
  setOverlayCafeId,
} from '@/redux/slices/overlayCafeSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import { BrandType, CafeType } from '@/types';

interface CafeOverlayProps {
  cafe: CafeType;
  brands: BrandType[];
}

const CafeOverlay = ({ cafe, brands }: CafeOverlayProps) => {
  const dispatch = useAppDispatch();
  const brand = brands.find(brand => {
    if (cafe.place_name.includes(brand.name)) {
      return brand;
    }
  });

  const { mode, isHot } = useAppSelector(state => state.filter);
  // 카페 리스트와 상태 공유
  const { id, filterdValue } = useAppSelector(state => state.overlayCafe);

  const [isHidden, setIsHidden] = useState(false);
  // 카페 리스트와 상태 공유
  const onMouseEnter = () => {
    dispatch(setOverlayCafeId(cafe.id));
  };
  // 카페 리스트와 상태 공유
  const onMouseLeave = () => {
    dispatch(setOverlayCafeId(''));
  };
  // 카페 리스트와 상태 공유
  const onClick = () => {
    dispatch(setIsEnterLink(true));
  };

  useEffect(() => {
    if (!filterdValue) {
      setIsHidden(false);
      return;
    }
    if (!cafe.place_name.includes(filterdValue)) {
      setIsHidden(true);
    }
  }, [filterdValue]);

  if (!brand) return;

  return (
    <div
      className={`relative flex cursor-pointer overflow-hidden rounded-sm bg-white text-xs font-light text-white  shadow-xl duration-100 hover:scale-105 ${cafe.id === id && 'scale-105'} ${isHidden ? 'hidden' : 'block'}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className='bg-emerald-600 px-1 '>
        <span>{brand.name}</span>
      </div>
      <div className='bg-black/70 '>
        <span className='px-1'>
          {mode === 'price' && isHot && `${brand.hot.price}원/잔`}
          {mode === 'mlPrice' &&
            isHot &&
            `${Math.round((brand.hot.price / brand.hot.amount) * 100)}원/100ml`}
          {mode === 'caffeinePrice' &&
            isHot &&
            `${Math.round((brand.hot.caffeine / brand.hot.amount) * 100)}원/100ml`}
          {mode === 'price' && !isHot && `${brand.ice.price}원/잔`}
          {mode === 'mlPrice' &&
            !isHot &&
            `${Math.round((brand.ice.price / brand.ice.amount) * 100)}원/100ml`}
          {mode === 'caffeinePrice' &&
            !isHot &&
            `${Math.round((brand.ice.caffeine / brand.ice.amount) * 100)}원/100ml`}
        </span>
      </div>
      <div className={`px-1  ${isHot ? 'bg-red-500' : 'bg-blue-500'}`}>
        <span>{isHot ? 'Hot' : 'Ice'}</span>
      </div>
    </div>
  );
};

export default CafeOverlay;
