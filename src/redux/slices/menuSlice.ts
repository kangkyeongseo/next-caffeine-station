import { createSlice } from '@reduxjs/toolkit';
import { MenuType } from '@/types';

const initialState: { menu: MenuType } = {
  menu: {
    menuName: '',
    category: '',
    types: [],
    sizes: [],
    nutritionalInfos: [],
  },
};

const menuSlice = createSlice({
  name: 'Menu',
  initialState,
  reducers: {
    setMenu(state, action) {
      state.menu = action.payload;
    },
  },
});

export const { setMenu } = menuSlice.actions;
export default menuSlice.reducer;
