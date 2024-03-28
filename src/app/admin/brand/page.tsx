import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import BrandContainer from '@/components/Admin/Brand/BrandContainer';
import { BrandType } from '@/types';

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'brand'));
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as BrandType;
    });
  } catch (error) {
    return [];
  }
};

export default async function BrandPage() {
  const brands = await fetchData();
  return (
    <div className='mx-auto mt-20 min-h-[700px] w-[600px] border-2'>
      <BrandContainer brands={brands} />
    </div>
  );
}
