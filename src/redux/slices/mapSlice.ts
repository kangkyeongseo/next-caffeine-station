import { createSlice } from '@reduxjs/toolkit';

type Map = { map: any };

const initialState: Map = { map: null };

const mapSlice = createSlice({
  name: 'Map',
  initialState,
  reducers: {
    setMap(state, action) {
      state.map = action.payload;
    },
  },
});

export const { setMap } = mapSlice.actions;
export default mapSlice.reducer;
