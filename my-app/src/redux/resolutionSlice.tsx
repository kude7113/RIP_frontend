import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api'; // Импортируем API-клиент
import { DsResolutions, DsFines } from "../api/Api.ts";

// Определяем типы данных корзины
export interface FineCartItem {
    fines: DsFines;
    count: number;
    fin_res_id: string;
}

export interface CartData {
    Res: DsResolutions;
    Fines: FineCartItem[];
}

// Интерфейс состояния корзины
interface CartState {
    cart: CartData | null;
    isLoading: boolean;
    error: string | null;
}

// Начальное состояние
const initialState: CartState = {
    cart: null,
    isLoading: false,
    error: null,
};

/* ✅ Удаление штрафа */
export const deleteFinFromRes = createAsyncThunk(
    'cart/deleteFine',
    async (finResId: string, { rejectWithValue }) => {
        try {
            console.log("Удаление штрафа с ID:", finResId);
            await api.fr.deleteDelete(finResId);
            return finResId; // Возвращаем ID удаленного штрафа
        } catch (error: any) {
            console.error("Ошибка при удалении штрафа:", error);
            return rejectWithValue('Ошибка при удалении штрафа');
        }
    }
);

/* ✅ Удаление resolution (корзины) */
export const deleteResolution = createAsyncThunk(
    'cart/deleteResolution',
    async (_, { rejectWithValue }) => {
        try {
            const resolutionId = localStorage.getItem('resId');
            if (!resolutionId) {
                throw new Error("Ошибка: resId отсутствует в localStorage");
            }

            await api.resolution.deleteDelete(Number(resolutionId));
            localStorage.removeItem('resId'); // Удаляем resId из localStorage после удаления

            console.log("Резолюция удалена:", resolutionId);
            return resolutionId;
        } catch (error: any) {
            console.error("Ошибка удаления резолюции:", error);
            return rejectWithValue('Ошибка при удалении резолюции');
        }
    }
);

/* ✅ Загрузка корзины (резолюции) */
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, thunkAPI) => {
        try {
            let resolutionId = localStorage.getItem('resId');

            if (!resolutionId || resolutionId === '0') {
                console.warn("⚠ resId не найден, не запрашиваем корзину");
                return null;
            }

            const response = await api.resolution.resolutionDetail(resolutionId);
            console.log("✅ Данные корзины обновлены:", response.data);
            return response.data;
        } catch (error) {
            console.error("❌ Ошибка загрузки корзины:", error);
            return thunkAPI.rejectWithValue('Ошибка при загрузке корзины');
        }
    }
);

/* ✅ Создаём слайс для корзины */
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {
            state.cart = null;
            state.error = null;
            state.isLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            /* ✅ Загрузка корзины */
            .addCase(fetchCart.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.isLoading = false;
                state.cart = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Ошибка загрузки корзины';
            })

            /* ✅ Удаление штрафа */
            .addCase(deleteFinFromRes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteFinFromRes.fulfilled, (state, action) => {
                state.isLoading = false;
                if (state.cart && state.cart.Fines) {
                    state.cart.Fines = state.cart.Fines.filter(
                        (item) => item.fin_res_id !== action.payload
                    );
                    console.log("Штраф удален из Redux:", action.payload);
                }
            })
            .addCase(deleteFinFromRes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Ошибка удаления штрафа';
            })

            /* ✅ Удаление резолюции */
            .addCase(deleteResolution.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteResolution.fulfilled, (state) => {
                state.isLoading = false;
                state.cart = null;
                console.log("Корзина успешно очищена.");
            })
            .addCase(deleteResolution.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Ошибка удаления резолюции';
            });
    },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
