import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastMessage } from "../common/methods";
import { API } from "../config/api";
import moment from "moment";

export const productAdd = createAsyncThunk('/product/add',
    async (values) => {
        try {
            const response = await API.post('/product/add', values);
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data;
        } catch (error) {
            console.log('error:- ', error);
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const productUpdate = createAsyncThunk('/product/update',
    async (values) => {
        try {
            console.log('productUpdate values:- ', values);
            const response = await API.post('/product/update', values);
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data;
        } catch (error) {
            console.log('productUpdate -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const productFindAll = createAsyncThunk('/product/find/all',
    async () => {
        try {
            const response = await API.post('/product/find/all');
            return response.data;
        } catch (error) {
            console.log('productFindAll -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const productDelete = createAsyncThunk('/product/delete',
    async (values) => {
        try {
            const response = await API.post('/product/delete', values);
            if (response.data.code === 200) {
                toastMessage('success', response.data.message);
            }
            return response.data
        } catch (error) {
            console.log('productDelete -> slice -> error');
            toastMessage('error', 'We are facing some technical issue');
            const errorObj = { ...error }
            throw errorObj;
        }
    }
);

export const productFilter = createAsyncThunk('filter',
    (values) => {
        return values;
    }
);

const initialState = {
    findAll: [],
    filteredFindAll: [],
    findOne: {
        product: '',
        price: '',
        creation_date: moment().format('YYYY-MM-DD'),
    }
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productFindAll.fulfilled, (state, action) => {
            state.findAll = action.payload.data;
            state.filteredFindAll = action.payload.data;
        });
        builder.addCase(productFilter.fulfilled, (state, action) => {
            state.filteredFindAll = action.payload;
        });
    }
});