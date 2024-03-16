import React from 'react';
import Link from 'next/link';
import { CafeType } from '@/types';
import { brands } from '@/content';

const Cafe = ({ cafe }: { cafe: CafeType }) => {
  const brand = brands.find(brand => {
    if (cafe.place_name.includes(brand.name)) {
      return brand;
    }
  });

  return (
    <li>
      {/* <Link href={`/cafe/${brand && brand.id}?lat=${cafe.y}&lon=${cafe.x}`}> */}
      {/* <Link href={`/cafe/${cafe.place_name}`}>{cafe.place_name}</Link> */}
      <Link href={`/cafe/${brand?.id}?name=${cafe.place_name}`}>
        {cafe.place_name}
      </Link>
    </li>
  );
};

export default Cafe;
