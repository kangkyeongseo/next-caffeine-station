import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { BrandType, PlaceType } from '@/types';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsEnterLink,
  setOverlayCafeId,
} from '@/redux/slices/overlayCafeSlice';

interface CafeItemProps {
  cafe: PlaceType;
  brands: BrandType[];
}

const CafeItem = ({ cafe, brands }: CafeItemProps) => {
  const dispatch = useAppDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);
  // 브랜드 검색
  const brand = cafe.place_name.includes('메가')
    ? brands.find(brand => brand.name === '메가MGC커피')
    : brands.find(brand => cafe.place_name.includes(brand.name));
  // 카페 이름 길이 제한
  const placeName =
    cafe.place_name.length <= 15
      ? cafe.place_name
      : cafe.place_name.substring(0, 15).concat('...');
  // 지도의 커스텀 오버레이와 상태 공유
  const { id, isEnterLink } = useAppSelector(state => state.overlayCafe);

  // 지도의 커스텀 오버레이와 상태 공유
  const onMouseEnter = () => {
    dispatch(setOverlayCafeId(cafe.id));
  };
  // 지도의 커스텀 오버레이와 상태 공유
  const onMouseLeave = () => {
    dispatch(setOverlayCafeId(''));
  };
  // 커스텀 오버레이에서 클릭 시 Link태그 클릭
  useEffect(() => {
    if (linkRef.current && isEnterLink && id === cafe.id) {
      linkRef.current.click();
      dispatch(setIsEnterLink(false));
    }
  }, [isEnterLink, id, cafe.id, dispatch]);

  return (
    <li
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className='min-w-[80%] translate-x-[10%] snap-center'
    >
      <Link
        ref={linkRef}
        href={`/cafe/${brand?.id}?name=${cafe.place_name}`}
        className={`mx-auto flex h-full w-[95%] items-center justify-between rounded-xl border bg-white p-4 hover:bg-gray-100  lg:pointer-events-auto lg:w-full lg:rounded-none lg:border-none lg:py-2 ${cafe.id === id && 'bg-gray-100'}`}
      >
        <div className='flex flex-col'>
          <span className='font-medium'>{placeName}</span>
          <span className='text-xs'>{cafe.address_name}</span>
        </div>
        <div>
          <span className='text-sm font-medium text-emerald-800'>
            {cafe.distance}m
          </span>
        </div>
      </Link>
    </li>
  );
};

export default CafeItem;
