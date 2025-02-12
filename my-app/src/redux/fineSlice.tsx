// src/redux/fineSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DsFines } from "../api/Api.ts";
import { api  } from "../api";
import { ALBUMS_MOCK } from "../modules/mock.ts";
import {fetchCart} from "./resolutionSlice.tsx";





export interface FinesState {
    searchValue: string;
    loading: boolean;
    fines: DsFines[];
    resCount: number;
    resId: number;
}

const initialState: FinesState = {
    searchValue: '',
    loading: false,
    fines: [],
    resCount: 0,
    resId: 0,
};

export const getFinesList = createAsyncThunk(
    'fine/fineList',
    async (_, { getState, rejectWithValue }) => {
        // Правильно достаем состояние из store: обращаемся к fines
        const state = getState() as { fines: FinesState };
        const searchValue = state.fines.searchValue;


        try {
            const response = await api.fine.fineList({ searchFines: searchValue });
            return response.data;
        } catch (error) {
            return rejectWithValue('Ошибка при загрузке данных');
        }
    }
);

export const addFineToResolution = createAsyncThunk(
    'fine/addFineToResolution',
    async (fineId: number, thunkAPI) => {
        try {
            const response = await api.fine.postFine(fineId);
            console.log(`✅ Штраф ${fineId} добавлен в резолюцию:`, response.data);

            // ✅ Получаем новый `resId` от сервера
            let updatedResId = response.data?.resId || localStorage.getItem('resId');

            if (updatedResId && updatedResId !== '0') {
                console.log(`🔄 Обновляем resId: ${updatedResId}`);

                // ✅ Обновляем `localStorage`
                localStorage.setItem('resId', updatedResId);

                // ✅ Обновляем `Redux`
                thunkAPI.dispatch(finesSlice.actions.updateResId(updatedResId));

                // ✅ Дожидаемся обновления Redux перед `fetchCart()`
                await new Promise((resolve) => setTimeout(resolve, 10));

                // ✅ Загружаем обновленную корзину
                await thunkAPI.dispatch(fetchCart());
            } else {
                console.error("⚠ Ошибка: resId не обновился.");
            }

            return fineId;
        } catch (error) {
            console.error("❌ Ошибка добавления штрафа:", error);
            return thunkAPI.rejectWithValue("Ошибка при добавлении штрафа");
        }
    }
);






const finesSlice = createSlice({
    name: 'fines',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
        },
        updateResId(state, action) {
            state.resId = action.payload; // ✅ Обновляем `resId` в Redux
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFinesList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getFinesList.fulfilled, (state, action) => {
                state.loading = false;
                state.fines = action.payload?.fines ?? []; // Если fines нет, ставим пустой массив
                state.resCount = action.payload?.resCount ?? 0;
                state.resId = action.payload?.resId ?? 0;
                localStorage.setItem('resId', action.payload.resId);
            })
            .addCase(getFinesList.rejected, (state) => {
                state.loading = false;
                state.fines = ALBUMS_MOCK.fines.filter((item) =>
                    item.title.toLocaleLowerCase().startsWith(state.searchValue.toLocaleLowerCase())
                );
                state.resCount = ALBUMS_MOCK.resCount;
                state.resId = ALBUMS_MOCK.resId;
                console.log("error")
            });
    },
});

export const { setSearchValue } = finesSlice.actions;
export default finesSlice.reducer;