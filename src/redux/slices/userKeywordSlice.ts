import { createSlice } from '@reduxjs/toolkit';

type UserKeywordType = {
  costEffective: string[];
  premium: string[];
  custom: string[];
};

const initialState: { userKeyword: UserKeywordType } = {
  userKeyword: {
    costEffective: [],
    premium: [],
    custom: [],
  },
};

const userKeywordSlice = createSlice({
  name: 'userKeyword',
  initialState,
  reducers: {
    setUserKeyword(state, action) {
      state.userKeyword = action.payload;
    },
  },
});

export const { setUserKeyword } = userKeywordSlice.actions;
export default userKeywordSlice.reducer;
