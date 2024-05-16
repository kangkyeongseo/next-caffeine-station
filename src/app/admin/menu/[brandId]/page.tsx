import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { db } from '@/libs/server/firebase';
import { BrandType, MenuType } from '@/types';
import BrandMenuContainer from '@/components/Admin/Menu/BrandMenuContainer';

// export async function generateStaticParams() {
//   const querySnapshot = await getDocs(collection(db, 'brand'));
//   const brands = querySnapshot.docs.map(doc => {
//     return { id: doc.id, ...doc.data() } as BrandType;
//   });

//   return brands.map(brand => ({
//     brandId: brand.id,
//   }));
// }

const fetchData = async (brandId: string) => {
  try {
    const menuQuery = query(
      collection(db, 'menu'),
      where('brandId', '==', brandId),
    );
    const menuQuerySnapshot = await getDocs(menuQuery);
    const brandDocSnapshot = await getDoc(doc(db, 'brand', brandId));

    const menus = menuQuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });
    const brand = {
      id: brandDocSnapshot.id,
      ...brandDocSnapshot.data(),
    } as BrandType;

    menus.sort((a, b) => {
      return a.nutritionalInfos[0].price - b.nutritionalInfos[0].price;
    });

    return { menus, brand };
  } catch (error) {
    return {};
  }
};

export default async function BrandMenuPage({
  params: { brandId },
}: {
  params: { brandId: string };
}) {
  const { menus, brand } = await fetchData(brandId);
  if (!menus) return;
  if (!brand) return;
  return <BrandMenuContainer menus={menus} brand={brand} />;
}
