import Map from '@/components/Main/Map';
import CafeList from '@/components/Main/CafeList';
import FilteringController from '@/components/Main/FilteringController';

export default function Home() {
  return (
    <div className='relative'>
      <FilteringController />
      <Map />
      <CafeList />
    </div>
  );
}
