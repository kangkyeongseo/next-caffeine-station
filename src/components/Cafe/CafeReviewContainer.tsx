import React, { useEffect, useMemo, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import useUser from '@/hooks/useUser';
import { Frown, Smile } from '@/image/svgs ';
import { ReviewType } from '@/types';
import { db } from '@/libs/server/firebase';
import Spinner from '../Spinner';

interface CafeReviewContainerProps {
  id: string;
}

const CafeReviewContainer = ({ id }: CafeReviewContainerProps) => {
  const { user, rule, isUserLoading } = useUser();

  const [cafeReview, setCafeReview] = useState<ReviewType | null>(null);
  const [isReviewLoading, setIsReviewLoading] = useState(true);

  const { negative, positive } = useMemo(() => {
    return cafeReview
      ? { negative: cafeReview.negative, positive: cafeReview.positive }
      : { negative: new Array(1), positive: new Array(1) };
  }, [cafeReview]);

  const negativePercent = useMemo(
    () => (negative.length / (negative.length + positive.length)) * 100,
    [cafeReview],
  );

  const positivePercent = useMemo(
    () => (positive.length / (negative.length + positive.length)) * 100,
    [cafeReview],
  );

  const isNegativeVote = useMemo(() => {
    return user && cafeReview?.negative.includes(user.uid);
  }, [cafeReview]);

  const isPositiveVote = useMemo(() => {
    return user && cafeReview?.positive.includes(user.uid);
  }, [cafeReview]);

  const onClickItem = async (type: 'negative' | 'positive') => {
    if (isUserLoading) return;
    if (rule === 'guest' || !user) return;
    let updatedReview;
    if (!cafeReview) {
      updatedReview = {
        cafeId: id,
        negative: type === 'negative' ? [user?.uid] : [],
        positive: type === 'positive' ? [user?.uid] : [],
      } as ReviewType;
      const docRef = await addDoc(collection(db, 'review'), updatedReview);
      setCafeReview({ ...updatedReview, id: docRef.id });
    } else if (cafeReview) {
      updatedReview = {
        id: cafeReview.id,
        cafeId: id,
        negative:
          type === 'negative' && !isNegativeVote
            ? [...cafeReview.negative, user.uid]
            : type === 'positive' && isNegativeVote
              ? cafeReview.negative.filter(item => item !== user.uid)
              : cafeReview.negative,
        positive:
          type === 'positive' && !isPositiveVote
            ? [...cafeReview.positive, user.uid]
            : type === 'negative' && isPositiveVote
              ? cafeReview.positive.filter(item => item !== user.uid)
              : cafeReview.positive,
      } as ReviewType;

      await setDoc(doc(db, 'review', cafeReview.id), updatedReview);
      setCafeReview(updatedReview);
    }
  };

  useEffect(() => {
    const getReiew = async () => {
      const reviewQuery = query(
        collection(db, 'review'),
        where('cafeId', '==', id),
      );
      const reviewQuerySnapshot = await getDocs(reviewQuery);
      const reviews = reviewQuerySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ReviewType;
      });
      const review = reviews[0];
      setCafeReview(review);
      setIsReviewLoading(false);
    };
    getReiew();
  }, []);

  return (
    <>
      {isReviewLoading ? (
        <div className='flex h-40 items-center justify-center'>
          <Spinner size='large' color='green' />
        </div>
      ) : (
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
      )}
    </>
  );
};

export default CafeReviewContainer;
