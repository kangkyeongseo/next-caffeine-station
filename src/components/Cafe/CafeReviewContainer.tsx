import React from 'react';
import { useRouter } from 'next/navigation';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import useUser from '@/hooks/useUser';
import { Frown, Smile } from '@/image/svgs ';
import { ReviewType } from '@/types';
import { db } from '@/libs/server/firebase';

interface CafeReviewContainerProps {
  id: string;
  reviewId: string | undefined;
  review: ReviewType | null;
}

const CafeReviewContainer = ({
  id,
  reviewId,
  review,
}: CafeReviewContainerProps) => {
  const router = useRouter();
  const { user, rule, isUserLoading } = useUser();

  const { negative, positive } = review
    ? { negative: review.negative, positive: review.positive }
    : { negative: [1], positive: [1] };

  const negativePercent =
    (negative.length / (negative.length + positive.length)) * 100;
  const positivePercent =
    (positive.length / (negative.length + positive.length)) * 100;

  const onClickItem = async (type: 'negative' | 'positive') => {
    if (isUserLoading) return;
    if (rule === 'guest' || !user) return;
    if (!reviewId) {
      await addDoc(collection(db, 'review'), {
        cafeId: id,
        negative: type === 'negative' ? [user?.uid] : [],
        positive: type === 'positive' ? [user?.uid] : [],
      });
    } else if (review) {
      const isNegativeVote = review.negative.includes(user.uid);
      const isPositiveVote = review.positive.includes(user.uid);

      await setDoc(doc(db, 'review', reviewId), {
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
      });
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
            className='group flex flex-col items-center gap-2'
            onClick={() => onClickItem('negative')}
          >
            <div className='size-14 text-red-400 group-hover:text-red-500'>
              <Frown />
            </div>
            <span className='text-sm'>추천하지 않아요</span>
          </li>
          <li
            className='group flex flex-col items-center gap-2'
            onClick={() => onClickItem('positive')}
          >
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
