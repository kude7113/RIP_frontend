import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';

interface UserState {
    token: string | null;
    login: string;
    isAuthenticated: boolean;
    error: string | null;
}

const initialState: UserState = {
    token: null,
    login: '',
    isAuthenticated: false,
    error: null,
};

// Асинхронное действие для авторизации с использованием JWT
export const loginUserAsync = createAsyncThunk(
    'user/loginUserAsync',
    async (credentials: { login: string; password: string }, { rejectWithValue }) => {
        try {
            // Ожидается, что endpoint login вернёт данные вида:
            // { token: string, login: string, ... }
            const response = await api.user.loginCreate(credentials);
            return response.data;
        } catch (error: any) {
            // При необходимости можно уточнить обработку ошибки (например, error.response.data.message)
            return rejectWithValue(error.response?.data?.message || 'Ошибка авторизации');
        }
    }
);

// Асинхронное действие для выхода из системы
export const logoutUserAsync = createAsyncThunk(
    'user/logoutUserAsync',
    async (_, { rejectWithValue }) => {
        try {
            // Если бекенд реализует logout, вызываем соответствующий endpoint.
            // Если logout реализуется только на стороне клиента (удаление токена), можно сразу вернуть успех.
            const response = await api.user.logoutCreate();
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data?.message || 'Ошибка при выходе из системы');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // Дополнительный редьюсер для установки учетных данных (например, при инициализации из localStorage)
        setCredentials(state, action) {
            state.token = action.payload.token;
            state.login = action.payload.login;
            state.isAuthenticated = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUserAsync.pending, (state) => {
                state.error = null;
            })
            .addCase(loginUserAsync.fulfilled, (state, action) => {
                const { token, login } = action.payload;
                state.token = token;
                state.login = login;
                state.isAuthenticated = true;
                state.error = null;
                localStorage.setItem('token', token);
                localStorage.setItem('login', login);
            })
            .addCase(loginUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
                state.token = null;
                state.login = '';
                state.isAuthenticated = false;
            })
            .addCase(logoutUserAsync.fulfilled, (state) => {
                state.token = null;
                state.login = '';
                state.isAuthenticated = false;
                state.error = null;
                localStorage.removeItem('token');
                localStorage.removeItem('login');
                localStorage.removeItem('resId');
            })
            .addCase(logoutUserAsync.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export const { setCredentials } = userSlice.actions;
export default userSlice.reducer;
