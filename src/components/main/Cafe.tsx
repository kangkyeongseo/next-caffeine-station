import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { CafeType } from '@/types';
import { brands } from '@/content';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import {
  setIsEnterLink,
  setOverlayCafeId,
} from '@/redux/slices/overlayCafeSlice';

const Cafe = ({ cafe }: { cafe: CafeType }) => {
  const dispatch = useAppDispatch();
  const linkRef = useRef<HTMLAnchorElement>(null);
  // 브랜드 검색
  const brand = brands.find(brand => {
    if (cafe.place_name.includes(brand.name)) {
      return brand;
    }
  });
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
    if (!linkRef) return;
    if (isEnterLink && linkRef.current) {
      linkRef.current.click();
    }
    dispatch(setIsEnterLink(false));
  }, [isEnterLink]);

  return (
    <li onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link
        ref={linkRef}
        href={`/cafe/${brand?.id}?name=${cafe.place_name}`}
        className={`flex items-center justify-between px-4 py-2 hover:bg-gray-100 ${cafe.id === id && 'bg-gray-100'}`}
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

export default Cafe;
