// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import fineReducer from './fineSlice.tsx';
import userReducer from './userSlice';

export const store = configureStore({
    reducer: {
        fines: fineReducer,
        user: userReducer
    },
});

// Типы для использования в `useSelector` и `useDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
