import React, { useEffect, useState } from 'react';
import { useAppDispatch } from '@/redux/store';
import { setCoords } from '@/redux/slices/mapSlice';
import { Search } from '@/image/svgs ';
import { PlaceType, PsType } from '@/types';
import useSearchPlace from '@/hooks/useSearchPlace';

interface SearchFilterProps {
  ps: PsType;
}

const SearchFilter = React.memo(({ ps }: SearchFilterProps) => {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState('');

  const { places, setSearchKeyword } = useSearchPlace(ps);

  const setSearchPlace = (place: PlaceType) => {
    if (places.length === 0) return;
    dispatch(
      setCoords({
        latitude: Number(place.y),
        longitude: Number(place.x),
      }),
    );
    setValue('');
  };

  const onSubmit = (event: React.FormEvent) => {
    if (places.length === 0) return;
    event.preventDefault();
    setSearchPlace(places[0]);
  };

  const onLinkClick = (place: PlaceType) => {
    setSearchPlace(place);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setSearchKeyword(value);
  }, [value, setSearchKeyword]);

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
        onClick={() => setSearchPlace(places[0])}
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
                onClick={() => onLinkClick(place)}
              >
                {place.place_name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </form>
  );
});

SearchFilter.displayName = 'SearchFilter';

export default SearchFilter;
