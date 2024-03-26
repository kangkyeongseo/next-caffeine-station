import React from 'react';
import { useRouter } from 'next/navigation';
import { UseFormHandleSubmit, UseFormRegister } from 'react-hook-form';
import { BrandFormType } from '@/types';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';

interface SettingBrandProps {
  register: UseFormRegister<BrandFormType>;
  selectedBrandId: string;
  setIsSettingOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<BrandFormType, undefined>;
}

const SettingBrand = ({
  register,
  selectedBrandId,
  setIsSettingOpen,
  handleSubmit,
}: SettingBrandProps) => {
  const router = useRouter();

  const onDeleteBrand = async () => {
    await deleteDoc(doc(db, 'brand', selectedBrandId));
    setIsSettingOpen(false);
    router.refresh();
  };

  const onValidEdit = async (data: BrandFormType) => {
    await setDoc(doc(db, 'brand', selectedBrandId), {
      name: data.cafeName,
      type: data.cafeType,
      hot: {
        price: data.hotPrice,
        amount: data.hotAmount,
        caffeine: data.hotCaffeine,
      },
      ice: {
        price: data.icePrice,
        amount: data.iceAmount,
        caffeine: data.iceCaffeine,
      },
    });
    setIsSettingOpen(false);
    router.refresh();
  };
  return (
    <div className='absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/70'>
      <div className='w-[400px] bg-white'>
        <form>
          <div className='grid grid-cols-[1fr,3fr] border-b'>
            <div className='bg-emerald-600 py-1 text-center text-white'>
              카페명
            </div>
            <input
              {...register('cafeName')}
              type='text'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b'>
            <div className='bg-emerald-600 py-1 text-center text-white'>
              타입
            </div>
            <input
              {...register('cafeType')}
              type='text'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b'>
            <div className='flex items-center justify-center border-r bg-emerald-600 py-1 text-center text-white'>
              Hot
            </div>
            <div>
              <div className='grid grid-cols-[1fr,3fr] border-b'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  가격
                </div>
                <input
                  {...register('hotPrice')}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  용량
                </div>
                <input
                  {...register('hotAmount')}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr]'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  카페인
                </div>
                <input
                  {...register('hotCaffeine')}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b'>
            <div className='flex items-center justify-center border-r bg-emerald-600 py-1 text-center text-white'>
              Ice
            </div>
            <div>
              <div className='grid grid-cols-[1fr,3fr] border-b'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  가격
                </div>
                <input
                  {...register('icePrice')}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  용량
                </div>
                <input
                  {...register('iceAmount')}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr]'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  카페인
                </div>
                <input
                  {...register('iceCaffeine')}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
            </div>
          </div>
        </form>
        <div className='grid grid-cols-3'>
          <button
            onClick={() => setIsSettingOpen(false)}
            className='bg-gray-500 py-2 text-white hover:bg-gray-600'
          >
            취소
          </button>
          <button
            onClick={onDeleteBrand}
            className='bg-red-500 py-2 text-white hover:bg-red-600'
          >
            삭제
          </button>
          <button
            onClick={handleSubmit(onValidEdit)}
            className='bg-blue-500 py-2 text-white hover:bg-blue-600'
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingBrand;
