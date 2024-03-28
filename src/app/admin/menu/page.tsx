import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType } from '@/types';

const fetchData = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'brand'));
    return querySnapshot.docs.map(doc => {
      return { id: doc.id, name: doc.data().name } as BrandType;
    });
  } catch (error) {
    return [];
  }
};

export default async function MenuPage() {
  const brands = await fetchData();
  return (
    <div>
      <span>카페 리스트</span>
      <ul>
        {brands.map(brand => (
          <li key={brand.id}>
            <Link href={`/admin/menu/${brand.id}`}>{brand.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
