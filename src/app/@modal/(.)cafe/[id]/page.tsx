import Modal from './(component)/Modal';
import ModalContainer from './(component)/ModalContainer';

export default function CafeModal({ params }: { params: { id: string } }) {
  return (
    <Modal>
      <ModalContainer cafeId={params.id} />
    </Modal>
  );
}
