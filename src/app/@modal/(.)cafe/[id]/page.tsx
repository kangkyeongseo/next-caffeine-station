import { collection, getDocs, query, where } from 'firebase/firestore';
import Modal from '../../../../components/Modal';
import ModalContainer from '../../../../components/Cafe/ModalContainer';
import { db } from '@/libs/server/firebase';
import { MenuType } from '@/types';

export const revalidate = 10;

const fetchData = async (id: string) => {
  try {
    const menuQuery = query(collection(db, 'menu'), where('brandId', '==', id));
    const menuQuerySnapshot = await getDocs(menuQuery);
    const menus = menuQuerySnapshot.docs.map(doc => {
      return { id: doc.id, ...doc.data() } as MenuType;
    });

    return { menus };
  } catch (error) {
    return { menus: [] };
  }
};

export default async function CafeModal({
  params: { id },
}: {
  params: { id: string };
}) {
  const { menus } = await fetchData(id);

  return (
    <Modal>
      <ModalContainer id={id} menus={menus} />
    </Modal>
  );
}
