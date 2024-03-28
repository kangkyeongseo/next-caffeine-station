import { db } from '@/libs/server/firebase';
import { BrandFormType, BrandType } from '@/types';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';

interface EditBrandModalProps {
  brand: BrandType;
  setIsEditBrandModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditBrandModal = ({
  brand,
  setIsEditBrandModalOpen,
}: EditBrandModalProps) => {
  const router = useRouter();
  const { register, handleSubmit, setValue, watch } = useForm<BrandFormType>({
    defaultValues: {
      name: brand.name,
      type: brand.type,
      hotPrice: brand.hot.price,
      hotAmount: brand.hot.amount,
      hotCaffeine: brand.hot.caffeine,
      icePrice: brand.ice.price,
      iceAmount: brand.ice.amount,
      iceCaffeine: brand.ice.caffeine,
    },
  });

  const onDeleteBrand = async () => {
    await deleteDoc(doc(db, 'brand', brand.id));
    setIsEditBrandModalOpen(false);
    router.refresh();
  };

  const onValidToEditBrand = async (data: BrandFormType) => {
    await setDoc(doc(db, 'brand', brand.id), {
      name: data.name,
      type: data.type,
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
    setIsEditBrandModalOpen(false);
    router.refresh();
  };

  return (
    <div className='absolute left-0 top-0 flex h-screen w-screen items-center justify-center gap-4 bg-black/70'>
      <div className='min-h-[750px]'>
        <div className='w-[400px] bg-white'>
          <div className='bg-black/80 py-2 text-center'>
            <span className='text-white'>브랜드 추가하기</span>
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2'>
            <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
              카페명
            </span>
            <input
              {...register('name', { required: true })}
              type='text'
              placeholder='카페명을 입력해주세요.'
              className='px-4 outline-none'
            />
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2'>
            <span className='border-r-2 bg-emerald-600 py-2 text-center text-white'>
              타입
            </span>
            <ul className='grid grid-cols-2'>
              {['가성비', '프리미엄'].map(array => (
                <li
                  key={array}
                  className={`flex h-full cursor-pointer items-center justify-center border-r-2 last:border-r-0 ${watch('type') === array ? 'bg-emerald-800 text-white' : ''}`}
                  onClick={() => setValue('type', array)}
                >
                  {array}
                </li>
              ))}
            </ul>
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2 text-white'>
            <div className='flex items-center justify-center border-r-2 bg-emerald-600'>
              Hot
            </div>
            <div>
              <div className='grid grid-cols-[1fr,3fr] border-b-2'>
                <span className='border-r-2 bg-emerald-600 py-1 text-center'>
                  가격
                </span>
                <input
                  {...register('hotPrice', { required: true })}
                  type='number'
                  className='px-4 text-black outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b-2'>
                <span className='border-r-2 bg-emerald-600 py-1 text-center'>
                  용량
                </span>
                <input
                  {...register('hotAmount', { required: true })}
                  type='number'
                  className='px-4 text-black outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b-2'>
                <span className='border-r-2 bg-emerald-600 py-1 text-center'>
                  카페인
                </span>
                <input
                  {...register('hotCaffeine', { required: true })}
                  type='number'
                  className='px-4 text-black outline-none'
                />
              </div>
            </div>
          </div>
          <div className='grid grid-cols-[1fr,3fr] border-b-2 text-white'>
            <div className='flex items-center justify-center border-r-2 bg-emerald-600'>
              Ice
            </div>
            <div>
              <div className='grid grid-cols-[1fr,3fr] border-b-2'>
                <span className='border-r-2 bg-emerald-600 py-1 text-center'>
                  가격
                </span>
                <input
                  {...register('icePrice', { required: true })}
                  type='number'
                  className='px-4 text-black outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b-2'>
                <span className='border-r-2 bg-emerald-600 py-1 text-center'>
                  용량
                </span>
                <input
                  {...register('iceAmount', { required: true })}
                  type='number'
                  className='px-4 text-black outline-none'
                />
              </div>
              <div className='grid grid-cols-[1fr,3fr] border-b-2'>
                <span className='border-r-2 bg-emerald-600 py-1 text-center'>
                  카페인
                </span>
                <input
                  {...register('iceCaffeine', { required: true })}
                  type='number'
                  className='px-4 text-black outline-none'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3'>
          <button
            onClick={() => setIsEditBrandModalOpen(false)}
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
            onClick={handleSubmit(onValidToEditBrand)}
            className='bg-blue-500 py-2 text-white hover:bg-blue-600'
          >
            수정
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBrandModal;
