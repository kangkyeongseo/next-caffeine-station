import { db } from '@/libs/server/firebase';
import { BrandFormType } from '@/types';
import { addDoc, collection } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface AddBrandProps {
  setIsAddOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddBrand = ({ setIsAddOpen }: AddBrandProps) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<BrandFormType>();

  const onValid = async (data: BrandFormType) => {
    await addDoc(collection(db, 'brand'), {
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
    setIsAddOpen(false);
    router.refresh();
  };

  return (
    <div className='absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-black/70'>
      <div className='w-[400px] bg-white'>
        <form onSubmit={handleSubmit(onValid)}>
          <div className='grid grid-cols-[1fr,3fr] border-b'>
            <div className='bg-emerald-600 py-1 text-center text-white'>
              카페명
            </div>
            <input
              {...register('cafeName', { required: true })}
              type='text'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b'>
            <div className='bg-emerald-600 py-1 text-center text-white'>
              타입
            </div>
            <input
              {...register('cafeType', { required: true })}
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
                  {...register('hotPrice', { required: true })}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  용량
                </div>
                <input
                  {...register('hotAmount', { required: true })}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr]'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  카페인
                </div>
                <input
                  {...register('hotCaffeine', { required: true })}
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
                  {...register('icePrice', { required: true })}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  용량
                </div>
                <input
                  {...register('iceAmount', { required: true })}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr]'>
                <div className='bg-emerald-600 py-1 text-center text-white'>
                  카페인
                </div>
                <input
                  {...register('iceCaffeine', { required: true })}
                  type='number'
                  className='px-4 outline-none'
                />
              </div>
            </div>
          </div>
        </form>
        <div className='grid grid-cols-2'>
          <button
            onClick={() => setIsAddOpen(false)}
            className='bg-gray-500 py-2 text-white hover:bg-gray-600'
          >
            취소
          </button>
          <button
            className='bg-blue-500 py-2 text-white hover:bg-blue-600'
            onClick={handleSubmit(onValid)}
          >
            추가
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddBrand;
