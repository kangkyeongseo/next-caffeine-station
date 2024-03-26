import Link from 'next/link';

export default async function AdminPage() {
  return (
    <div className='flex flex-col'>
      <Link href={'/admin/brand'}>브랜드</Link>
      <Link href={'/admin/menu'}>매뉴</Link>
    </div>
  );
}
