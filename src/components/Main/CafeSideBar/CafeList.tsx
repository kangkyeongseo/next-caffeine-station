import { BrandType, PlaceType } from '@/types';
import React, { useEffect, useRef } from 'react';
import CafeItem from './CafeItem';
import { useAppSelector } from '@/redux/store';
import Spinner from '@/components/Spinner';

interface CafeListProps {
  filteringCafes: PlaceType[];
  isCafesLoading: boolean;
  brands: BrandType[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  isObserverLoading: boolean;
}

const CafeList = ({
  filteringCafes,
  isCafesLoading,
  brands,
  setPage,
  isObserverLoading,
}: CafeListProps) => {
  const { keywords } = useAppSelector(state => state.filter);
  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isObserverLoading) return;
    if (keywords[0] !== '모든 카페') return;
    const observerCallback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver,
    ) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setPage(prevPage => prevPage + 1);
          observer.disconnect();
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
    });

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
      observer.disconnect();
    };
  }, [filteringCafes, isObserverLoading, keywords, setPage]);

  return (
    <ul className='hide-scroll flex h-full snap-x snap-mandatory overflow-x-scroll lg:block lg:overflow-y-scroll'>
      {isCafesLoading ? (
        <li className='flex items-center justify-center p-5'>
          <Spinner size='medium' color='green' />
        </li>
      ) : filteringCafes.length === 0 ? (
        <li className='mx-auto flex w-[80%] items-center justify-center rounded-xl border bg-white p-4 text-black/30 lg:rounded-none lg:border-none'>
          <span>조건에 맞는 카페가 없습니다.</span>
        </li>
      ) : (
        filteringCafes.map(cafe => (
          <CafeItem key={cafe.id} cafe={cafe} brands={brands} />
        ))
      )}
      <div ref={triggerRef} className='h-10 place-self-center'></div>
      {/* {filteringCafes.length > 0 && isObserverLoading && (
        <div className='flex items-center justify-center p-5'>
          <Spinner size='small' color='green' />
        </div>
      )} */}
    </ul>
  );
};

export default CafeList;
