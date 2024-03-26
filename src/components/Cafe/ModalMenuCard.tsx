import { useAppSelector } from '@/redux/store';
import { nutritionalInfoType } from '@/types';
import React, { useEffect, useState } from 'react';

interface ModalMenuCardProps {
  isAnimation: boolean;
}

const ModalMenuCard = ({ isAnimation }: ModalMenuCardProps) => {
  const { menu } = useAppSelector(state => state.menu);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [nutritionalInfo, setNutritionalInfo] =
    useState<nutritionalInfoType | null>();

  useEffect(() => {
    menu.nutritionalInfos.forEach(info => {
      if (info.size === selectedSize && info.type === selectedType) {
        setNutritionalInfo(info);
      }
    });
  }, [menu, selectedSize, selectedType]);

  useEffect(() => {
    setSelectedSize(menu.sizes[0]);
    setSelectedType(menu.types[0]);
  }, [menu]);

  return (
    <div
      className={`absolute right-[-250px] top-0 h-fit w-[240px] overflow-hidden rounded-md bg-white duration-300 ${isAnimation ? 'opacity-100' : 'translate-y-28 opacity-0'}`}
    >
      <div className='flex h-[45px] items-center justify-center bg-emerald-600 px-4 py-2 text-center text-white'>
        <span className=''>{menu.menuName}</span>
      </div>
      <div className='space-y-2 pt-2'>
        <div className='flex items-center gap-4 px-2'>
          <span className='w-12 shrink-0 text-xs   text-gray-800'>사이즈</span>
          <div className='grid w-full grid-flow-col overflow-hidden rounded-full border text-sm'>
            {menu.sizes.map(size => (
              <span
                key={size}
                className={`cursor-pointer py-1 text-center ${size === selectedSize && 'bg-emerald-800 text-white'}`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </span>
            ))}
          </div>
        </div>
        <div className='flex items-center gap-4 px-2'>
          <span className='w-12 shrink-0 text-xs text-gray-800'>타입</span>
          <div className='grid w-full grid-flow-col overflow-hidden rounded-full border text-sm'>
            {menu.types.map(type => (
              <span
                key={type}
                className={`cursor-pointer py-1 text-center ${type === selectedType ? (type === 'hot' ? 'bg-red-500 text-white' : type === 'ice' ? 'bg-blue-500 text-white' : 'bg-emerald-800 text-white') : ''}`}
                onClick={() => setSelectedType(type)}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className='space-y-4 rounded-sm bg-gray-100 px-2 pb-2 pt-4 text-sm text-gray-800'>
          <p>{menu.description}</p>
          <ul className='text-xs font-semibold'>
            <li className='flex w-full justify-between'>
              <span>용량 :</span>
              <span>{nutritionalInfo?.amount}ml</span>
            </li>
            <li className='flex w-full justify-between'>
              <span>칼로리 :</span>
              <span>{nutritionalInfo?.kcal}kcal</span>
            </li>
            <li className='flex w-full justify-between'>
              <span>카페인 :</span>
              <span>{nutritionalInfo?.caffeine}mg</span>
            </li>
          </ul>
          <div className='flex w-full justify-end text-2xl font-bold'>
            {nutritionalInfo?.price}원
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMenuCard;
