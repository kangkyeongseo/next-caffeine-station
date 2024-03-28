import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { MenuFormType } from '@/types';

interface MenuFormProps {
  register: UseFormRegister<MenuFormType>;
  watch: UseFormWatch<MenuFormType>;
  setValue: UseFormSetValue<MenuFormType>;
  setError: UseFormSetError<MenuFormType>;
  clearErrors: UseFormClearErrors<MenuFormType>;
  errors: FieldErrors<MenuFormType>;
  types: string[];
  sizes: string[];
  setTypes: React.Dispatch<React.SetStateAction<string[]>>;
  setSizes: React.Dispatch<React.SetStateAction<string[]>>;
  addTypeInNutritionalInfos: (type: string) => void;
  addSizeInNutritionalInfos: (size: string) => void;
}

const MenuForm = ({
  register,
  watch,
  setValue,
  setError,
  clearErrors,
  errors,
  types,
  sizes,
  setTypes,
  setSizes,
  addTypeInNutritionalInfos,
  addSizeInNutritionalInfos,
}: MenuFormProps) => {
  const [typeValue, setTypeValue] = useState('');
  const [sizeValue, setSizeValue] = useState('');

  const handleChangeTypeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (errors.types && value === '') {
      clearErrors('types');
    }
    setTypeValue(value);
  };

  const handleChangeSizeValue = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    if (errors.types && value === '') {
      clearErrors('sizes');
    }
    setSizeValue(value);
  };

  const handleOnKeyPressInTypeInput = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') return;
    if (event.nativeEvent.isComposing) return;
    if (typeValue.length === 0) return;
    if (types.includes(typeValue)) {
      setError('types', { message: '이미 추가한 타입입니다.' });
    } else {
      setTypes(pre => [...pre, typeValue]);
      setTypeValue('');
      if (addTypeInNutritionalInfos) addTypeInNutritionalInfos(typeValue);
    }
  };

  const handleOnKeyPressInSizeInput = (
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key !== 'Enter') return;
    if (event.nativeEvent.isComposing) return;
    if (sizeValue.length === 0) return;
    if (sizes.includes(sizeValue)) {
      setError('sizes', { message: '이미 추가한 사이즈입니다.' });
    } else {
      setSizes(pre => [...pre, sizeValue]);
      setSizeValue('');
      if (addSizeInNutritionalInfos) addSizeInNutritionalInfos(sizeValue);
    }
  };

  return (
    <div className='w-[400px] bg-white'>
      <div className='bg-black/80 py-2 text-center'>
        <span className='text-white'>메뉴 추가하기</span>
      </div>
      <div className='grid grid-cols-[1fr,3fr] border-b-2'>
        <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
          상품명
        </span>
        <input
          {...register('menuName', { required: true })}
          type='text'
          placeholder='상품명을 입력해주세요.'
          className='px-4 outline-none'
        />
      </div>
      <div className='grid grid-cols-[1fr,3fr] border-b-2'>
        <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
          카테고리
        </span>
        <ul className='grid grid-cols-3'>
          {[
            ['커피', 'coffee'],
            ['음료', 'beverage'],
            ['디저트', 'dessert'],
          ].map(array => (
            <li
              key={array[0]}
              className={`flex h-full items-center justify-center border-r-2 last:border-r-0 ${watch('category') === array[1] ? 'bg-emerald-800 text-white' : ''}`}
              onClick={() => setValue('category', array[1])}
            >
              {array[0]}
            </li>
          ))}
        </ul>
      </div>
      <div className='grid grid-cols-[1fr,3fr] border-b-2'>
        <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
          타입
        </span>
        <input
          type='text'
          value={typeValue}
          onChange={handleChangeTypeValue}
          placeholder='타입을 추가해주세요.'
          className='px-4 outline-none'
          onKeyDown={handleOnKeyPressInTypeInput}
        />
      </div>
      {errors.types && (
        <div className='bg-gray-200 text-center'>
          <span className='text-red-500'>{errors.types.message}</span>
        </div>
      )}
      <div className='grid grid-cols-[1fr,3fr] border-b-2'>
        <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
          사이즈
        </span>
        <input
          type='text'
          value={sizeValue}
          onChange={handleChangeSizeValue}
          placeholder='사이즈를 추가해주세요.'
          className='px-4 outline-none'
          onKeyDown={handleOnKeyPressInSizeInput}
        />
      </div>
      {errors.sizes && (
        <div className='bg-gray-200 text-center'>
          <span className='text-red-500'>{errors.sizes.message}</span>
        </div>
      )}
    </div>
  );
};

export default MenuForm;
