import { db } from '@/libs/server/firebase';
import { MenuFormType, MenuType, NutritionalInfoType } from '@/types';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import MenuForm from './MenuForm';
import NutritionalInfoForm from './NutritionalInfoForm';
import { useForm } from 'react-hook-form';

interface EditMenuModalProps {
  menu: MenuType;
  setIsEditMenuModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  brandId: string;
}

const EditMenuModal = ({
  menu,
  setIsEditMenuModalOpen,
  brandId,
}: EditMenuModalProps) => {
  const router = useRouter();

  const [types, setTypes] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [nutritionalInfos, setNutritionalInfos] = useState<
    NutritionalInfoType[]
  >([]);

  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<MenuFormType>({
    defaultValues: {
      brandId: menu.brandId,
      menuName: menu.menuName,
      category: menu.category,
      types: menu.types,
      sizes: menu.sizes,
      nutritionalInfos: menu.nutritionalInfos,
    },
  });

  const onValidToEditMenu = async (data: MenuFormType) => {
    await setDoc(doc(db, 'menu', menu.id), {
      brandId,
      menuName: data.menuName,
      category: data.category,
      types: data.types,
      sizes: data.sizes,
      nutritionalInfos: nutritionalInfos,
    });
    setIsEditMenuModalOpen(false);
    router.refresh();
  };

  const onDeleteMenu = async () => {
    await deleteDoc(doc(db, 'menu', menu.id));
    setIsEditMenuModalOpen(false);
    router.refresh();
  };

  const addTypeInNutritionalInfos = (type: string) => {
    if (sizes.length === 0) return;
    sizes.forEach(size => {
      setNutritionalInfos(pre => [
        ...pre,
        { type, size, price: 0, amount: 0, kcal: 0, caffeine: 0 },
      ]);
    });
  };

  const addSizeInNutritionalInfos = (size: string) => {
    if (types.length === 0) return;
    types.forEach(type => {
      setNutritionalInfos(pre => [
        ...pre,
        { type, size, price: 0, amount: 0, kcal: 0, caffeine: 0 },
      ]);
    });
  };

  useEffect(() => {
    setTypes(menu.types);
    setSizes(menu.sizes);
    setNutritionalInfos(menu.nutritionalInfos);
  }, []);

  const removeTypeInNutritionalInfos = (type: string) => {
    setNutritionalInfos(pre => pre.filter(info => info.type !== type));
  };

  const removeSizeInNutritionalInfos = (size: string) => {
    setNutritionalInfos(pre => pre.filter(info => info.size !== size));
  };

  useEffect(() => {
    setValue('types', types);
  }, [types]);

  useEffect(() => {
    setValue('sizes', sizes);
  }, [sizes]);

  return (
    <div className='absolute left-0 top-0 flex h-screen w-screen items-center justify-center gap-4 bg-black/70'>
      <div className='min-h-[700px]'>
        <MenuForm
          register={register}
          watch={watch}
          setValue={setValue}
          setError={setError}
          clearErrors={clearErrors}
          errors={errors}
          types={types}
          setTypes={setTypes}
          sizes={sizes}
          setSizes={setSizes}
          addTypeInNutritionalInfos={addTypeInNutritionalInfos}
          addSizeInNutritionalInfos={addSizeInNutritionalInfos}
        />
        <NutritionalInfoForm
          types={types}
          setTypes={setTypes}
          sizes={sizes}
          setSizes={setSizes}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedSize={selectedSize}
          setSelectedSize={setSelectedSize}
          nutritionalInfos={nutritionalInfos}
          setNutritionalInfos={setNutritionalInfos}
          removeTypeInNutritionalInfos={removeTypeInNutritionalInfos}
          removeSizeInNutritionalInfos={removeSizeInNutritionalInfos}
        />
        <div className='grid grid-cols-3'>
          <button
            onClick={() => setIsEditMenuModalOpen(false)}
            className='bg-gray-500 py-2 text-white hover:bg-gray-600'
          >
            취소
          </button>
          <button
            onClick={onDeleteMenu}
            className='bg-red-500 py-2 text-white hover:bg-gray-600'
          >
            삭제
          </button>
          <button
            className='bg-blue-500 py-2 text-white hover:bg-blue-600'
            onClick={handleSubmit(onValidToEditMenu)}
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditMenuModal;
