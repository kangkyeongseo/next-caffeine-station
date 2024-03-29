export interface CoordsType {
  latitude: number;
  longitude: number;
}

export interface CafeType {
  address_name: string;
  category_group_code: string;
  category_group_name: string;
  category_name: string;
  distance: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  x: string;
  y: string;
}

export interface nutritionalInfoType {
  type: string;
  size: string;
  price: number;
  amount: number;
  kcal: number;
  caffeine: number;
}

export interface MenuType {
  menuName: string;
  category: string;
  types: string[];
  sizes: string[];
  description: string;
  nutritionalInfos: nutritionalInfoType[];
}
