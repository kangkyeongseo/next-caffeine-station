import { CoordsType } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

type MapType = { map: any; coords: CoordsType | null; isMapLoading: boolean };

const initialState: MapType = { map: null, coords: null, isMapLoading: true };

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
    setIsMapLoading(state, action) {
      state.isMapLoading = action.payload;
    },
  },
});

export const { setMap, setCoords, setIsMapLoading } = mapSlice.actions;
export default mapSlice.reducer;
