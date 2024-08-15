import React, { useState } from 'react';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import useUser from '@/hooks/useUser';
import { Frown, Smile } from '@/image/svgs ';
import { ReviewType } from '@/types';
import { db } from '@/libs/server/firebase';

interface CafeReviewContainerProps {
  id: string;
  review: ReviewType | null;
}

const CafeReviewContainer = ({ id, review }: CafeReviewContainerProps) => {
  const { user, rule, isUserLoading } = useUser();

  const [cafeReview, setCafeReview] = useState<ReviewType | null>(review);

  const { negative, positive } = cafeReview
    ? { negative: cafeReview.negative, positive: cafeReview.positive }
    : { negative: [1], positive: [1] };

  const negativePercent =
    (negative.length / (negative.length + positive.length)) * 100;
  const positivePercent =
    (positive.length / (negative.length + positive.length)) * 100;

  const isNegativeVote = user && cafeReview?.negative.includes(user.uid);
  const isPositiveVote = user && cafeReview?.positive.includes(user.uid);

  const onClickItem = async (type: 'negative' | 'positive') => {
    if (isUserLoading) return;
    if (rule === 'guest' || !user) return;
    let updatedReview;
    if (!review?.id) {
      updatedReview = {
        cafeId: id,
        negative: type === 'negative' ? [user?.uid] : [],
        positive: type === 'positive' ? [user?.uid] : [],
      } as ReviewType;
      await addDoc(collection(db, 'review'), updatedReview);
      setCafeReview(updatedReview);
    } else if (review) {
      updatedReview = {
        cafeId: id,
        negative:
          type === 'negative' && !isNegativeVote
            ? [...review.negative, user.uid]
            : type === 'positive' && isNegativeVote
              ? review.negative.filter(item => item !== user.uid)
              : review.negative,
        positive:
          type === 'positive' && !isPositiveVote
            ? [...review.positive, user.uid]
            : type === 'negative' && isPositiveVote
              ? review.positive.filter(item => item !== user.uid)
              : review.positive,
      } as ReviewType;

      await setDoc(doc(db, 'review', review.id), updatedReview);
      setCafeReview(updatedReview);
    }
  };

  return (
    <div className='space-y-6 px-4'>
      <div className='mt-16 space-y-10 text-center'>
        <span className='text-sm lg:text-base lg:font-bold'>
          해당 장소를 평가해주세요.
        </span>
        <ul className='grid grid-cols-2 text-gray-700'>
          <li
            className='group flex cursor-pointer flex-col items-center gap-2'
            onClick={() => onClickItem('negative')}
          >
            <div
              className={`size-14  group-hover:text-red-500 ${isNegativeVote ? 'text-red-500' : 'text-red-300'}`}
            >
              <Frown />
            </div>
            <span className='text-sm'>추천하지 않아요</span>
          </li>
          <li
            className='group flex cursor-pointer flex-col items-center gap-2'
            onClick={() => onClickItem('positive')}
          >
            <div
              className={`size-14  group-hover:text-blue-500 ${isPositiveVote ? 'text-blue-500' : 'text-blue-300'}`}
            >
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
              {negativePercent !== 0 && `${Math.round(negativePercent)}%`}
            </span>
          </div>
          <div
            className={`flex h-full items-center justify-center bg-blue-500`}
            style={{ width: `${positivePercent}%` }}
          >
            <span className='text-xs text-white'>
              {positivePercent !== 0 && `${Math.round(positivePercent)}%`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CafeReviewContainer;
