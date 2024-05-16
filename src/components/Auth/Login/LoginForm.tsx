'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Lock, User } from '@/image/svgs ';
import { LoginFormType } from '@/types';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/libs/server/firebase';
import { AuthFormProps } from '../AuthContainer';

const LoginForm = ({ setType }: AuthFormProps) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormType>();

  const onLoginValid = async (data: LoginFormType) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        router.back();
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode);
      });
  };

  return (
    <form
      className='w-full space-y-3 px-12'
      onSubmit={handleSubmit(onLoginValid)}
    >
      <div className='relative'>
        <input
          {...register('email', {
            required: '이메일을 입력해 주세요.',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
              message: '이메일 형식을 확인해 주세요.',
            },
          })}
          type='text'
          className='peer h-12 w-full rounded-full border px-12 outline-none focus:border-emerald-600'
          placeholder='이메일'
        />
        <span className='absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 peer-focus:text-emerald-600'>
          <User />
        </span>
      </div>
      <div className='px-3 text-xs text-red-500'>{errors.email?.message}</div>
      <div className='relative'>
        <input
          {...register('password', { required: '비밀번호를 입력해 주세요.' })}
          type='password'
          className='peer h-12 w-full rounded-full border px-12 outline-none focus:border-emerald-600'
          placeholder='비밀번호'
        />
        <span className='absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 peer-focus:text-emerald-600'>
          <Lock />
        </span>
      </div>
      <div className='px-3 text-xs text-red-500'>
        {errors.password?.message}
      </div>
      <div className='space-x-3 text-center '>
        <span
          className='cursor-pointer text-sm text-gray-400'
          onClick={() => setType('join')}
        >
          회원가입
        </span>
        <span className='text-sm text-gray-400'>/</span>
        <span
          className='cursor-pointer text-sm text-gray-400'
          onClick={() => setType('password')}
        >
          비밀번호 재설정
        </span>
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
