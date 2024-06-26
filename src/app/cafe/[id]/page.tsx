import ModalContainer from '@/components/Cafe/ModalContainer';
import { db } from '@/libs/server/firebase';
import { MenuType } from '@/types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';

const fetchData = async (brandId: string) => {
  try {
    const menuQuery = query(
      collection(db, 'menu'),
      where('brandId', '==', brandId),
    );
    const menuQuerySnapshot = await getDocs(menuQuery);
    const menus = menuQuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });

    return menus;
  } catch (error) {
    return [];
  }
};

export default async function CafeDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const menus = await fetchData(id);
  return (
    <div className='absolute right-0 top-0 z-[100] flex h-dvh w-screen items-center justify-center bg-black/80'>
      <ModalContainer menus={menus} />
    </div>
  );
}
