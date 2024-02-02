import Map from '@/components/main/cafeModal/Map';
import { CafeType } from '@/types';
import { Close, Phone, Place } from '../../../../public/svgs';
import { SetStateAction, useRef, useState } from 'react';
import { brands } from '@/content';

interface CafeDetailPageProps {
  cafe: CafeType | null;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
}

export default function CafeModal({
  cafe,
  setIsModalOpen,
}: CafeDetailPageProps) {
  const brand = brands.filter(brand => {
    if (cafe && cafe.place_name.includes(brand.name)) {
      return brand;
    } else {
      return null;
    }
  });

  console.log(brand);
  const overlay = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onOverlayClcik = (event: React.MouseEvent<HTMLElement>) => {
    const { target } = event;
    if (target === overlay.current) {
      setIsModalOpen(false);
    }
  };
  return (
    <div
      className='absolute right-0 top-0 z-20 flex h-screen w-screen items-center justify-center bg-[rgba(0,0,0,0.8)]'
      ref={overlay}
      onClick={onOverlayClcik}
    >
      {cafe && (
        <div className=' flex'>
          <div
            className={`z-30 space-y-4 rounded-xl bg-white p-4 ${isMenuOpen ? '-translate-x-[16px]' : 'translate-x-[160px]'} transition-all`}
          >
            <div>
              <span onClick={() => setIsModalOpen(false)}>
                <Close />
              </span>
            </div>
            <Map
              coords={{ latitude: Number(cafe.y), longitude: Number(cafe.x) }}
            />
            <div className='flex flex-col'>
              <span className='text-xl font-bold'>{cafe.place_name}</span>
              <div className='flex gap-2'>
                <div className='flex'>
                  <Place />
                  <span className='font-light'>{cafe.road_address_name}</span>
                </div>
                <div className='flex'>
                  <Phone />
                  <span className='font-light'>{cafe.phone}</span>
                </div>
              </div>
              <div>{cafe.distance}m 떨어진 위치에 있습니다.</div>
            </div>
            <div>
              <span>메뉴</span>
              <ul className='list-none'>
                {brand[0].menu?.map(coffee => (
                  <li
                    key={coffee.menuName}
                    onClick={() => setIsMenuOpen(pre => !pre)}
                    className='flex cursor-pointer items-center justify-between rounded-md border bg-gray-100 px-6 py-4 hover:bg-gray-200'
                  >
                    <span>{coffee.menuName}</span>
                    <div>
                      {coffee.kind.map(kind => (
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
          </div>
          <div
            className={`h-[420px] w-[320px] rounded-xl bg-white transition-all ${isMenuOpen ? 'opacity-100' : 'translate-y-28 opacity-0'}`}
          ></div>
        </div>
      )}
    </div>
  );
}
