import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';
import MenuContainer from '@/components/Admin/Menu/MenuContainer';

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'brand'));
    const brands = querySnapshot.docs.map(doc => {
      return { id: doc.id, name: doc.data().name } as BrandType;
    });

    return brands;
  } catch (error) {
    return [];
  }
};

export default async function MenuPage() {
  const brands = await fetchData();
  return <MenuContainer brands={brands} />;
}
