import { brands } from '@/content';
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

  return (
    <div className='rounded-xl border bg-white px-2 py-1'>
      {brand[0] && brand[0].hot}원
    </div>
  );
};

export default CafeOverlay;
