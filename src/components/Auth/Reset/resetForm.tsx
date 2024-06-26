'use client';
import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Lock } from '@/image/svgs ';
import { ResetFormType } from '@/types';
import { auth } from '@/libs/server/firebase';
import { confirmPasswordReset } from 'firebase/auth';
import AuthHeader from '../AuthHeader';

const ResetForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const oobCode = searchParams.get('oobCode') as string;
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<ResetFormType>();

  const onLoginValid = async (data: ResetFormType) => {
    if (watch('password').length < 6) {
      setError('password', {
        message: '비밀번호는 6글자 이상이어야 합니다.',
      });
      return;
    }

    if (watch('password') !== watch('passwordConfirm')) {
      setError('passwordConfirm', {
        message: '비밀번호가 일치 하지 않습니다.',
      });
      return;
    }
    confirmPasswordReset(auth, oobCode, data.password)
      .then(() => {
        router.push('/auth');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  return (
    <>
      <AuthHeader type={type} />
      <div className='mt-20 flex justify-center'>
        <form
          className='w-full space-y-3 px-10 lg:px-12'
          onSubmit={handleSubmit(onLoginValid)}
        >
          <div className='relative'>
            <input
              {...register('password', {
                required: '비밀번호를 입력해 주세요.',
              })}
              type='password'
              className={`peer h-12 w-full rounded-full border px-12 outline-none focus:border-emerald-600 ${errors.password ? 'border-red-500 focus:border-red-500' : 'focus:text-emerald-600'}`}
              placeholder='비밀번호'
            />
            <span
              className={`absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 ${errors.password ? 'text-red-500 peer-focus:border-red-500' : 'peer-focus:text-emerald-600'}`}
            >
              <Lock />
            </span>
          </div>
          <div className='px-3 text-xs text-red-500'>
            {errors.password?.message}
          </div>
          <div className='relative'>
            <input
              {...register('passwordConfirm', {
                required: '비밀번호를 입력해 주세요.',
              })}
              type='password'
              className={`peer h-12 w-full rounded-full border px-12 outline-none focus:border-emerald-600 ${errors.passwordConfirm ? 'border-red-500 focus:border-red-500' : 'focus:text-emerald-600'}`}
              placeholder='비밀번호 확인'
            />
            <span
              className={`absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 ${errors.passwordConfirm ? 'text-red-500 peer-focus:border-red-500' : 'peer-focus:text-emerald-600'}`}
            >
              <Lock />
            </span>
          </div>
          <div className='px-3 text-xs text-red-500'>
            {errors.passwordConfirm?.message}
          </div>
          <input
            type='submit'
            value='비밀번호 재설정'
            className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
          />
        </form>
      </div>
    </>
  );
};

export default ResetForm;
