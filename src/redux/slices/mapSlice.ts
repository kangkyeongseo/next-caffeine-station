import { CoordsType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type MapType = { map: any; coords: CoordsType | null };

const initialState: MapType = { map: null, coords: null };

const mapSlice = createSlice({
  name: 'Map',
  initialState,
  reducers: {
    setMap(state, action) {
      state.map = action.payload;
    },
    setCoords(state, action) {
      state.coords = action.payload;
    },
  },
});

export const { setMap, setCoords } = mapSlice.actions;
export default mapSlice.reducer;
