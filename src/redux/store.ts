import { configureStore } from '@reduxjs/toolkit';
import mapSlice from './slices/mapSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import filterSlice from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    map: mapSlice,
    filter: filterSlice,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
