import { brands } from '@/content';
import { useAppSelector } from '@/redux/store';
import { CafeType } from '@/types';

interface CafeOverlayProps {
  cafe: CafeType;
}

const CafeOverlay = ({ cafe }: CafeOverlayProps) => {
  const brand = brands.filter(brand => {
    if (cafe.place_name.includes(brand.name)) {
      return brand;
    }
  });

  const { mode, isHot } = useAppSelector(state => state.filter);

  return (
    <div className='rounded-xl border bg-white px-2 py-1'>
      <span>
        {mode === 'price' && isHot && `${brand[0].hot.price}원/잔`}
        {mode === 'mlPrice' &&
          isHot &&
          `${Math.round((brand[0].hot.price / brand[0].hot.amount) * 100)}원/100ml`}
        {mode === 'caffeinePrice' &&
          isHot &&
          `${Math.round((brand[0].hot.caffeine / brand[0].hot.amount) * 100)}원/100ml`}
      </span>
      <span>
        {mode === 'price' && !isHot && `${brand[0].ice.price}원/잔`}
        {mode === 'mlPrice' &&
          !isHot &&
          `${Math.round((brand[0].ice.price / brand[0].ice.amount) * 100)}원/100ml`}
        {mode === 'caffeinePrice' &&
          !isHot &&
          `${Math.round((brand[0].ice.caffeine / brand[0].ice.amount) * 100)}원/100ml`}
      </span>
    </div>
  );
};

export default CafeOverlay;
