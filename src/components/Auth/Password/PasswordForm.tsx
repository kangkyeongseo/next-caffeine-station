import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { PasswordFormType } from '@/types';
import { User } from '@/image/svgs ';

const PasswordForm = () => {
  const { register, handleSubmit } = useForm<PasswordFormType>();

  const onLoginValid = (data: PasswordFormType) => {
    console.log(data);
  };

  return (
    <form
      className='w-full space-y-3 px-12'
      onSubmit={handleSubmit(onLoginValid)}
    >
      <div className='relative'>
        <input
          {...register('userId')}
          type='text'
          className='peer h-12 w-full rounded-full border px-12 outline-none focus:border-emerald-600'
          placeholder='아이디'
        />
        <span className='absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 peer-focus:text-emerald-600'>
          <User />
        </span>
      </div>
      <div className='space-x-3 text-center '>
        <Link href={'/auth'} className='text-sm text-gray-400' replace>
          로그인
        </Link>
        <span className='text-sm text-gray-400'>/</span>
        <Link
          href={'/auth?type=join'}
          className='text-sm text-gray-400'
          replace
        >
          회원가입
        </Link>
      </div>
      <input
        type='submit'
        value='비밀번호 변경'
        className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
      />
    </form>
  );
};

export default PasswordForm;
