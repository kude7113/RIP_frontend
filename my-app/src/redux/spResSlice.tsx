// resolutionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Предполагаем, что API-клиент импортируется так:
import { api } from '../api'; // Импортируем API-клиент

// Асинхронный thunk для получения резолюций с переданными фильтрами,
// используя ваш API-метод resolution.resolutionList
export const fetchResolutions = createAsyncThunk(
    'resolutions/fetchResolutions',
    async (filters, { rejectWithValue }) => {
        try {
            const query: Record<string, string> = {};
            // @ts-ignore
            if (filters.dateFrom) query.date_from = filters.dateFrom;
            // @ts-ignore
            if (filters.dateTo) query.date_to = filters.dateTo;
            // @ts-ignore
            if (filters.status) query.status = filters.status;

            // Вызываем API-метод; предполагаем, что он возвращает полный ответ Axios
            const response = await api.resolution.resolutionList(query);

            // Возвращаем только полезные данные, исключая headers и другие несериализуемые поля
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);


// Thunk для запуска рекурсивного polling
// @ts-ignore
export const startPollingResolutions = () => async (dispatch, getState) => {
    const { filters, isPolling } = getState().resolutions;
    if (!isPolling) return; // Если polling остановлен, не продолжаем

    // Выполняем запрос с текущими фильтрами
    // @ts-ignore
    await dispatch(fetchResolutions(filters));

    // Если polling всё ещё включён, планируем следующий вызов
    if (getState().resolutions.isPolling) {
        const timeoutId = setTimeout(() => {
            dispatch(startPollingResolutions());
        }, 2000);
        dispatch(setPollingTimeout(timeoutId));
    }
};

// @ts-ignore
export const stopPollingResolutions = () => (dispatch, getState) => {
    const { pollingTimeout } = getState().resolutions;
    if (pollingTimeout) {
        clearTimeout(pollingTimeout);
        dispatch(clearPollingTimeout());
    }
    // Останавливаем polling, чтобы рекурсия не продолжалась
    dispatch(setIsPolling(false));
};

const areResolutionsEqual = (arr1: any[], arr2: any[]) => {
    return JSON.stringify(arr1) === JSON.stringify(arr2);
};

const resolutionsSlice = createSlice({
    name: 'resolutions',
    initialState: {
        resolutions: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
        pollingTimeout: null,
        filters: {
            dateFrom: '',
            dateTo: '',
            status: '',
        },
        isPolling: false,
    },
    reducers: {
        setPollingTimeout(state, action) {
            state.pollingTimeout = action.payload;
        },
        clearPollingTimeout(state) {
            state.pollingTimeout = null;
        },
        setFilters(state, action) {
            state.filters = { ...state.filters, ...action.payload };
        },
        setIsPolling(state, action) {
            state.isPolling = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchResolutions.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchResolutions.fulfilled, (state, action) => {
                state.status = 'succeeded';
                // Обновляем список только если новые данные отличаются от старых
                if (!areResolutionsEqual(state.resolutions, action.payload)) {
                    // @ts-ignore
                    state.resolutions = action.payload;
                }
            })
            .addCase(fetchResolutions.rejected, (state, action) => {
                state.status = 'failed';
                // @ts-ignore
                state.error = action.payload;
            });
    },
});

export const { setPollingTimeout, clearPollingTimeout, setFilters, setIsPolling } = resolutionsSlice.actions;
export default resolutionsSlice.reducer;
