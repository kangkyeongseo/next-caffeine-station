import React, { ChangeEvent } from 'react';
import { NutritionalInfoType } from '@/types';
import { Close } from '@/image/svgs ';

interface NutritionalInfoFormProps {
  types: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  sizes: string[];
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedType: string;
  setSelectedType: React.Dispatch<React.SetStateAction<string>>;
  selectedSize: string;
  setSelectedSize: React.Dispatch<React.SetStateAction<string>>;
  nutritionalInfos: NutritionalInfoType[];
  setNutritionalInfos: React.Dispatch<
    React.SetStateAction<NutritionalInfoType[]>
  >;
  removeTypeInNutritionalInfos: (type: string) => void;
  removeSizeInNutritionalInfos: (size: string) => void;
}

const NutritionalInfoForm = ({
  types,
  setTypes,
  sizes,
  setSizes,
  selectedType,
  setSelectedType,
  selectedSize,
  setSelectedSize,
  nutritionalInfos,
  setNutritionalInfos,
  removeTypeInNutritionalInfos,
  removeSizeInNutritionalInfos,
}: NutritionalInfoFormProps) => {
  const handleDeleyeType = (type: string) => {
    setTypes(pre => pre.filter(item => item !== type));
    setSelectedType('');
    if (removeTypeInNutritionalInfos) removeTypeInNutritionalInfos(type);
  };

  const handleDeleyeSize = (size: string) => {
    setSizes(pre => pre.filter(item => item !== size));
    setSelectedSize('');
    if (removeSizeInNutritionalInfos) removeSizeInNutritionalInfos(size);
  };

  const handleNutritionalInfoChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const {
      target: { name, value },
    } = event;

    const newNutritionalInfos = nutritionalInfos.map(info => {
      if (info.type === selectedType && info.size === selectedSize) {
        return { ...info, [name]: Number(value) };
      }
      return info;
    });

    setNutritionalInfos(newNutritionalInfos);
  };

  return (
    <div className='w-[400px] bg-white'>
      <div className='bg-black/80 py-2 text-center'>
        <span className='text-white'>영양 정보 추가하기</span>
      </div>
      <div className='border-b-2 p-2'>
        <div className='flex min-h-8 items-start gap-1'>
          <span className='shrink-0 rounded-sm bg-emerald-600 px-2 py-[2px] text-white'>
            타입
          </span>
          <ul className='flex flex-wrap gap-1'>
            {types.length === 0 && (
              <li className='text-gray-500'>추가된 타입이 없습니다.</li>
            )}
            {types.map(type => (
              <li
                key={type}
                onClick={() => setSelectedType(type)}
                className={`group relative cursor-pointer rounded-sm bg-black/60 px-2 py-[2px] text-white ${selectedType === type ? 'bg-black/90' : 'hover:bg-black/80'}`}
              >
                {type}
                <div
                  className='hover: absolute -right-2  -top-2 hidden size-5 items-center justify-center rounded-full bg-red-500 group-hover:flex'
                  onClick={() => handleDeleyeType(type)}
                >
                  <Close />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className='flex min-h-8 items-start gap-1'>
          <span className='shrink-0 rounded-sm bg-emerald-600 px-2 py-[2px] text-white'>
            사이즈
          </span>
          <ul className='flex flex-wrap gap-1'>
            {sizes.length === 0 && (
              <li className='text-gray-500'>추가된 사이즈가 없습니다.</li>
            )}
            {sizes.map(size => (
              <li
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`group relative cursor-pointer rounded-sm bg-black/60 px-2 py-[2px] text-white ${selectedSize === size ? 'bg-black/90' : 'hover:bg-black/80'}`}
              >
                {size}
                <div
                  className='hover: absolute -right-2  -top-2 hidden size-5 items-center justify-center rounded-full bg-red-500 group-hover:flex'
                  onClick={() => handleDeleyeSize(size)}
                >
                  <Close />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className='grid grid-cols-[1fr,3fr] border-b-2'>
        <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
          타입
        </span>
        <span className='py-2 text-center'>
          {selectedType.length > 0 ? selectedType : '타입을 선택해주세요.'}
        </span>
      </div>
      <div className='grid grid-cols-[1fr,3fr] border-b-2'>
        <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
          사이즈
        </span>
        <span className='py-2 text-center'>
          {selectedSize.length > 0 ? selectedSize : '사이즈를 선택해주세요.'}
        </span>
      </div>
      {nutritionalInfos?.map((info, i) => (
        <div
          key={i}
          className={`${info.type === selectedType && info.size === selectedSize ? 'block' : 'hidden'}`}
        >
          <div className='grid grid-cols-[1fr,3fr] border-b-2'>
            <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
              가격
            </span>
            <input
              type='number'
              name='price'
              value={info.price}
              onChange={handleNutritionalInfoChange}
              placeholder='가격을 입력해주세요.'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2'>
            <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
              용량
            </span>
            <input
              type='number'
              name='amount'
              value={info.amount}
              onChange={handleNutritionalInfoChange}
              placeholder='용량을 입력해주세요.'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2'>
            <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
              칼로리
            </span>
            <input
              type='number'
              name='kcal'
              value={info.kcal}
              onChange={handleNutritionalInfoChange}
              placeholder='칼로리를 입력해주세요.'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2'>
            <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
              카페인
            </span>
            <input
              type='number'
              name='caffeine'
              value={info.caffeine}
              onChange={handleNutritionalInfoChange}
              placeholder='카페인 용량을 입력해주세요.'
              className='px-4 outline-none'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NutritionalInfoForm;
