import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: '',
  isEnterLink: false,
  filterdValue: null,
};

const overlayCafeSlice = createSlice({
  name: 'overlayCafe',
  initialState,
  reducers: {
    setOverlayCafeId(state, action) {
      state.id = action.payload;
    },
    setIsEnterLink(state, action) {
      state.isEnterLink = action.payload;
    },
    setFilterdValue(state, action) {
      state.filterdValue = action.payload;
    },
  },
});

export const { setOverlayCafeId, setIsEnterLink, setFilterdValue } =
  overlayCafeSlice.actions;
export default overlayCafeSlice.reducer;
