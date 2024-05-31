import React from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { PasswordFormType } from '@/types';
import { User } from '@/image/svgs ';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '@/libs/server/firebase';
import { AuthFormProps } from '../AuthContainer';
import AuthHeader from '../AuthHeader';

const PasswordForm = ({ type, setType }: AuthFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormType>();

  const onLoginValid = (data: PasswordFormType) => {
    sendPasswordResetEmail(auth, data.email)
      .then(() => {})
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <>
      <AuthHeader type={type} />
      <div className='mt-20 flex justify-center'>
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
          <div className='px-3 text-xs text-red-500'>
            {errors.email?.message}
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
              onClick={() => setType('join')}
            >
              회원가입
            </span>
          </div>
          <input
            type='submit'
            value='이메일 발송'
            className='h-12 w-full cursor-pointer rounded-full bg-black/70 text-white hover:bg-black/80'
          />
        </form>
      </div>
    </>
  );
};

export default PasswordForm;
