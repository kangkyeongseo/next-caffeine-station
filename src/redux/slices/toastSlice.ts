import { createSlice } from '@reduxjs/toolkit';

interface ToastType {
  isOpen: boolean;
  content: string;
}

const initialState: ToastType = {
  isOpen: false,
  content: '',
};

const toastSlice = createSlice({
  name: 'Toast',
  initialState,
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
    },
    setContent(state, action) {
      state.content = action.payload;
    },
  },
});

export const { setIsOpen, setContent } = toastSlice.actions;
export default toastSlice.reducer;
