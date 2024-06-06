'use server';
import { revalidatePath } from 'next/cache';
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { BrandFormType } from '@/types';

export const addBrand = async (data: BrandFormType) => {
  await addDoc(collection(db, 'brand'), {
    name: data.name,
    type: data.type,
    hot: {
      price: data.hotPrice,
      amount: data.hotAmount,
      caffeine: data.hotCaffeine,
    },
    ice: {
      price: data.icePrice,
      amount: data.iceAmount,
      caffeine: data.iceCaffeine,
    },
  });
  revalidatePath('/admin/brand');
};

export const editBrand = async (data: BrandFormType, id: string) => {
  await setDoc(doc(db, 'brand', id), {
    name: data.name,
    type: data.type,
    hot: {
      price: data.hotPrice,
      amount: data.hotAmount,
      caffeine: data.hotCaffeine,
    },
    ice: {
      price: data.icePrice,
      amount: data.iceAmount,
      caffeine: data.iceCaffeine,
    },
  });
  revalidatePath('/admin/brand');
};

export const deleteBrand = async (id: string) => {
  await deleteDoc(doc(db, 'brand', id));
  revalidatePath('/admin/brand');
};
