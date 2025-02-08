// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './searchSlice';

export const store = configureStore({
    reducer: {
        search: searchReducer,
    },
});

// Типы для использования в `useSelector` и `useDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
