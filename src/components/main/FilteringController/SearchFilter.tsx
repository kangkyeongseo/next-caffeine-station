import { Search } from '@/image/svgs ';
import { setCoords } from '@/redux/slices/mapSlice';
import { useAppDispatch, useAppSelector } from '@/redux/store';
import React, { useEffect, useState } from 'react';

const SearchFilter = () => {
  const dispatch = useAppDispatch();
  const { map } = useAppSelector(state => state.map);
  const [ps, setPs] = useState<any>(null);
  const [value, setValue] = useState('');
  const [places, setPlaces] = useState<any[]>([]);

  const placesSearchCB = (data: any, status: string) => {
    if (status === window.kakao.maps.services.Status.OK) {
      setPlaces(data);
    } else {
      setPlaces([]);
    }
  };

  const setSearchPlace = () => {
    if (places.length === 0) return;
    const moveLatLon = new window.kakao.maps.LatLng(
      Number(places[0].y),
      Number(places[0].x),
    );
    map.setCenter(moveLatLon);
    dispatch(
      setCoords({
        latitude: Number(places[0].y),
        longitude: Number(places[0].x),
      }),
    );
    setPlaces([]);
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSearchPlace();
  };

  const onLinkClick = (keyword: string) => {
    setValue(keyword);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    if (!ps) return;
    if (value.length === 0) {
      setPlaces([]);
      return;
    }
    ps.keywordSearch(value, placesSearchCB, { size: 5 });
  }, [value]);

  useEffect(() => {
    window.kakao.maps.load(() => {
      setPs(new window.kakao.maps.services.Places());
    });
  }, []);

  return (
    <form className='relative' onSubmit={onSubmit}>
      <input
        type='text'
        className='w-full border py-2 pl-4 pr-10 outline-none'
        placeholder='장소 검색'
        value={value}
        onChange={onChange}
      />
      <span
        className='absolute right-4 top-[50%] h-5 w-5 translate-y-[-50%] cursor-pointer'
        onClick={setSearchPlace}
      >
        <Search />
      </span>
      {places.length > 0 && (
        <div className='absolute w-full rounded-b-md border bg-white px-2 py-1 text-sm'>
          <ul>
            {places.map(place => (
              <li
                key={place.id}
                className='rounded-md px-2 py-1 hover:bg-gray-100'
                onClick={() => onLinkClick(place.place_name)}
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
};

export default SearchFilter;
