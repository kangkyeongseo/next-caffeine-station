import Map from '@/components/Main/Map';
import CafeList from '@/components/Main/CafeList';
import FilteringController from '@/components/Main/FilteringController';
import SetMapButtons from '@/components/Main/SetMapButtons';

export default function Home() {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      <FilteringController />
      <Map />
      <CafeList />
      <SetMapButtons />
    </div>
  );
}
