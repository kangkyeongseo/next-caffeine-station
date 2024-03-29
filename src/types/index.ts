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

export interface NutritionalInfoType {
  type: string;
  size: string;
  price: number;
  amount: number;
  kcal: number;
  caffeine: number;
}

export interface MenuType {
  id: string;
  brandId: string;
  menuName: string;
  category: string;
  types: string[];
  sizes: string[];
  description: string;
  nutritionalInfos: NutritionalInfoType[];
}

export interface BrandType {
  id: string;
  name: string;
  type: string;
  hot: {
    price: number;
    amount: number;
    caffeine: number;
  };
  ice: {
    price: number;
    amount: number;
    caffeine: number;
  };
}

export interface BrandFormType {
  name: string;
  type: string;
  hotPrice: number;
  hotAmount: number;
  hotCaffeine: number;
  icePrice: number;
  iceAmount: number;
  iceCaffeine: number;
}

export interface MenuFormType {
  brandId: string;
  menuName: string;
  category: string;
  types: string[];
  sizes: string[];
  description: string;
  nutritionalInfos: NutritionalInfoType[];
}
