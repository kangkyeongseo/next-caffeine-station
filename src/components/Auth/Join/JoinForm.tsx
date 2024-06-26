'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { Lock, User } from '@/image/svgs ';
import { JoinFormType } from '@/types';
import { auth, db } from '@/libs/server/firebase';
import { AuthFormProps } from '../AuthContainer';
import AuthHeader from '../AuthHeader';

const JoinForm = ({ type, setType }: AuthFormProps) => {
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
        setDoc(doc(db, 'user', user.uid), {
          rule: 'user',
          keyword: {
            costEffective: ['빽다방', '메가MGC커피', '컴포즈커피'],
            premium: ['스타벅스', '폴바셋', '투썸플레이스'],
            custom: [],
          },
        });
        router.push('/auth');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode === 'auth/email-already-in-use') {
          setError('email', { message: '이미 사용중인 이메일 입니다.' });
        }
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
          <div className='px-3 text-xs text-red-500'>
            {errors.email?.message}
          </div>
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
          <div className='space-x-3 text-center '>
            <span
              className='cursor-pointer text-sm text-gray-400'
              onClick={() => setType('login')}
            >
              로그인
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
            value='회원가입'
            className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
          />
        </form>
      </div>
    </>
  );
};

export default JoinForm;
