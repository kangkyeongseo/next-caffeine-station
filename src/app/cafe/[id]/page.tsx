import { collection, getDocs, query, where } from 'firebase/firestore';
import ModalContainer from '@/components/Cafe/ModalContainer';
import { db } from '@/libs/server/firebase';
import { BrandType, MenuType, ReviewType } from '@/types';

export async function generateStaticParams() {
  const querySnapshot = await getDocs(collection(db, 'brand'));
  const brands = querySnapshot.docs.map(doc => {
    return { id: doc.id, ...doc.data() } as BrandType;
  });

  return brands.map(brand => ({
    id: brand.id,
  }));
}

export const revalidate = 10;

const fetchData = async (id: string) => {
  try {
    const menuQuery = query(collection(db, 'menu'), where('brandId', '==', id));
    const menuQuerySnapshot = await getDocs(menuQuery);
    const menus = menuQuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });
    menus.sort((a, b) => {
      return a.nutritionalInfos[0].price - b.nutritionalInfos[0].price;
    });

    if (menus.length === 0) {
      const reviewQuery = query(
        collection(db, 'review'),
        where('cafeId', '==', id),
      );
      const reviewQuerySnapshot = await getDocs(reviewQuery);
      const reviews = reviewQuerySnapshot.docs.map(doc => {
        return { id: doc.id, ...doc.data() } as ReviewType;
      });
      const review = reviews[0];
      return { menus: [], review };
    }

    return { menus, review: null };
  } catch (error) {
    return { menus: [], review: null };
  }
};

export default async function CafeDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  const { menus, review } = await fetchData(id);

  return (
    <div className='absolute right-0 top-0 z-[100] flex h-dvh w-screen items-center justify-center bg-black/80'>
      <ModalContainer
        id={id}
        reviewId={review?.id}
        menus={menus}
        review={review}
      />
    </div>
  );
}
