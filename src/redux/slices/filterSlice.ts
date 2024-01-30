import { createSlice } from '@reduxjs/toolkit';

interface FilterType {
  mode: 'price' | 'mlPrice' | 'caffeinePrice';
  isHot: boolean;
}

const initialState: FilterType = { mode: 'price', isHot: true };

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
  },
});

export const { setMode, setIsHot } = filterSlice.actions;
export default filterSlice.reducer;
