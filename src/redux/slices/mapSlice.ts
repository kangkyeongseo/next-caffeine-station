import { createSlice } from '@reduxjs/toolkit';

type MapType = { map: any };

const initialState: MapType = { map: null };

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
