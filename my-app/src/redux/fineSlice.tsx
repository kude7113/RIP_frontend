// src/redux/fineSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { DsFines } from "../api/Api.ts";
import { api  } from "../api";
import { ALBUMS_MOCK } from "../modules/mock.ts";


interface FinesState {
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




const finesSlice = createSlice({
    name: 'fines',
    initialState,
    reducers: {
        setSearchValue(state, action) {
            state.searchValue = action.payload;
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