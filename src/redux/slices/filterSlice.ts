import { createSlice } from '@reduxjs/toolkit';

interface FilterType {
  mode: 'price' | 'mlPrice' | 'caffeinePrice';
  isHot: boolean;
  distance: number;
  keywords: string[];
}

const initialState: FilterType = {
  mode: 'price',
  isHot: true,
  distance: 300,
  keywords: ['빽다방', '메가MGC커피', '컴포즈커피'],
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
