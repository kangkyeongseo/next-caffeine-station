import React from 'react';
import { Frown, Smile } from '@/image/svgs ';
import { ReviewType } from '@/types';

interface CafeReviewContainerProps {
  review: ReviewType | null;
}

const CafeReviewContainer = ({ review }: CafeReviewContainerProps) => {
  const { negative, positive } = review
    ? { negative: review.negative, positive: review.positive }
    : { negative: 1, positive: 1 };

  const negativePercent = (negative / (negative + positive)) * 100;
  const positivePercent = (positive / (negative + positive)) * 100;

  return (
    <div className='space-y-6 px-4'>
      <div className='mt-16 space-y-10 text-center'>
        <span className='text-sm lg:text-base lg:font-bold'>
          해당 장소를 평가해주세요.
        </span>
        <ul className='grid grid-cols-2 text-gray-700'>
          <li className='group flex flex-col items-center gap-2'>
            <div className='size-14 text-red-400 group-hover:text-red-500'>
              <Frown />
            </div>
            <span className='text-sm'>추천하지 않아요</span>
          </li>
          <li className='group flex flex-col items-center gap-2'>
            <div className='size-14 text-blue-400 group-hover:text-blue-500'>
              <Smile />
            </div>
            <span className='text-sm'>추천해요</span>
          </li>
        </ul>
      </div>
      <div className='px-10'>
        <div className='flex h-6 overflow-hidden rounded-xl border'>
          <div
            className={`flex h-full items-center justify-center bg-red-500`}
            style={{ width: `${negativePercent}%` }}
          >
            <span className='text-xs text-white'>
              {Math.round(negativePercent)}%
            </span>
          </div>
          <div
            className={`flex h-full items-center justify-center bg-blue-500`}
            style={{ width: `${positivePercent}%` }}
          >
            <span className='text-xs text-white'>
              {Math.round(positivePercent)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeReviewContainer;
