import { useAppSelector } from '@/redux/store';
import { nutritionalInfoType } from '@/types';
import React, { useEffect, useState } from 'react';

interface ModalMenuCardProps {
  isAnimation: boolean;
}

const ModalMenuCard = ({ isAnimation }: ModalMenuCardProps) => {
  const { menu } = useAppSelector(state => state.menu);
  const [size, setSize] = useState(menu.sizes[0]);
  const [type, setType] = useState(menu.types[0]);
  const [nutritionalInfo, setNutritionalInfo] =
    useState<nutritionalInfoType | null>();

  console.log(nutritionalInfo);

  useEffect(() => {
    menu.nutritionalInfos.forEach(info => {
      if (info.size === size && info.type === type) {
        setNutritionalInfo(info);
      }
    });
  }, [menu, size, type]);
  return (
    <div
      className={`h-[420px] w-[320px] rounded-xl bg-white duration-300 ${isAnimation ? 'opacity-100' : 'translate-y-28 opacity-0'}`}
    >
      <span>{menu.menuName}</span>
      <div>
        {menu.sizes.map(size => (
          <div key={size}>{size}</div>
        ))}
      </div>
      <div>
        {menu.types.map(type => (
          <div key={type}>{type}</div>
        ))}
      </div>
      <ul>
        <li>{nutritionalInfo?.price}</li>
        <li>{nutritionalInfo?.amount}</li>
        <li>{nutritionalInfo?.kcal}</li>
        <li>{nutritionalInfo?.caffeine}</li>
      </ul>
    </div>
  );
};

export default ModalMenuCard;
