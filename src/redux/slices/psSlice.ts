import { createSlice } from '@reduxjs/toolkit';
import { PsType } from '@/types';

type PsSliceType = { ps: PsType };

const initialState: PsSliceType = { ps: null };

const psSlice = createSlice({
  name: 'Ps',
  initialState,
  reducers: {
    setPs(state, action) {
      state.ps = action.payload;
    },
  },
});

export const { setPs } = psSlice.actions;
export default psSlice.reducer;
