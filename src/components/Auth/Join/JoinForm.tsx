'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Lock, User } from '@/image/svgs ';
import { JoinFormType } from '@/types';
import { auth } from '@/libs/server/firebase';

const JoinForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<JoinFormType>();

  const onLoginValid = async (data: JoinFormType) => {
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

    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        // Signed in
        const user = userCredential.user;
        router.push('/auth');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setError('email', { message: '이미 사용중인 이메일 입니다.' });
        }
        // ..
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
          className={`peer h-12 w-full rounded-full border bg-white px-12 outline-none ${errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-emerald-600'}`}
          placeholder='이메일'
        />
        <span
          className={`absolute left-4 top-[50%] w-5 translate-y-[-50%] text-gray-300 ${errors.email ? 'text-red-500 peer-focus:border-red-500' : 'peer-focus:text-emerald-600'}`}
        >
          <User />
        </span>
      </div>
      <div className='px-3 text-xs text-red-500'>{errors.email?.message}</div>
      <div className='relative'>
        <input
          {...register('password', { required: '비밀번호를 입력해 주세요.' })}
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
      <div className='space-x-3 text-center '>
        <Link href={'/auth'} className='text-sm text-gray-400' replace>
          로그인
        </Link>
        <span className='text-sm text-gray-400'>/</span>
        <Link
          href={'/auth?type=password'}
          className='text-sm text-gray-400'
          replace
        >
          비밀번호 변경
        </Link>
      </div>
      <input
        type='submit'
        value='회원가입'
        className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
      />
    </form>
  );
};

export default JoinForm;
