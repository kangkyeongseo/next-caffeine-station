import { CafeType } from '@/types';
import React from 'react';

const Cafe = ({ cafe }: { cafe: CafeType }) => {
  return <div>{cafe.place_name}</div>;
};

export default Cafe;
