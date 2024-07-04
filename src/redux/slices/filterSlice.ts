import { createSlice } from '@reduxjs/toolkit';

export type DistanceType = 300 | 500 | 1000;
export type ModeType = 'price' | 'mlPrice' | 'caffeinePrice';
export type TempType = 'hot' | 'ice';

interface FilterType {
  mode: ModeType;
  isHot: boolean;
  distance: DistanceType;
  keywords: string[];
}

const initialState: FilterType = {
  mode: 'price',
  isHot: true,
  distance: 300,
  keywords: [],
};

const filterSlice = createSlice({
  name: 'Filter',
  initialState,
  reducers: {
    setMode(state, action) {
      state.mode = action.payload;
    },
    setIsHot(state, action) {
      state.isHot = action.payload;
    },
    setDistance(state, action) {
      state.distance = action.payload;
    },
    setKeywords(state, action) {
      state.keywords = action.payload;
    },
  },
});

export const { setMode, setIsHot, setDistance, setKeywords } =
  filterSlice.actions;
export default filterSlice.reducer;
