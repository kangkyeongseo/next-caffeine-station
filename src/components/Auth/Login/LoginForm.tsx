'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from '@/image/svgs ';
import { useForm } from 'react-hook-form';
import { LoginFormType } from '@/types';
import Link from 'next/link';

const LoginForm = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<LoginFormType>();

  const onLinkClick = () => {
    router.back();
    router.push('/join');
  };
  const onLoginValid = (data: LoginFormType) => {
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
      <div className='relative'>
        <input
          {...register('password')}
          type='password'
          className='peer h-12 w-full rounded-full border px-12 outline-none focus:border-emerald-600'
          placeholder='비밀번호'
        />
        <span className='absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 peer-focus:text-emerald-600'>
          <Lock />
        </span>
      </div>
      <div className='space-x-3 text-center '>
        <Link href={'/auth?type=join'} className='text-sm text-gray-400'>
          회원가입
        </Link>
        <span className='text-sm text-gray-400'>/</span>
        <span className='text-sm text-gray-400'>비밀번호 찾기</span>
      </div>
      <input
        type='submit'
        value='로그인'
        className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
      />
    </form>
  );
};

export default LoginForm;
