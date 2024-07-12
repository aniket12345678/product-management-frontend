import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toastMessage } from "../common/methods";
import { API } from "../config/api";

export const productAdd = createAsyncThunk('/product/add',
    async (values) => {
        try {
            const response = await API.post('/product/add', values);
            return response.data;
        } catch (error) {
            console.log('error:- ', error);
        }
    }
);

export const productUpdate = createAsyncThunk('/product/update',
    async (values) => {
        try {
            console.log('productUpdate values:- ', values);
            const response = await API.post('/product/update', values);
            // if (response.data.code === 200) {
            //     toastMessage('success', response.data.message);
            // }
            return response.data;
        } catch (error) {
            console.log('productUpdate -> slice -> error');
            // toastMessage('error', 'We are facing some technical issue');
            // const errorObj = { ...error }
            // throw errorObj;
        }
    }
);

export const productFindAll = createAsyncThunk('/product/find/all',
    async () => {
        try {
            const response = await API.get('/product/find/all');
            return response.data;
        } catch (error) {
            console.log('productFindAll -> slice -> error');
            // toastMessage('error', 'We are facing some technical issue');
            // const errorObj = { ...error }
            // throw errorObj;
        }
    }
);

export const productFindOne = createAsyncThunk('/product/find/one',
    async (values) => {
        try {
            const response = await API.post('/product/find/one', values)
            return response.data
        } catch (error) {
            console.log('productFindOne -> slice -> error');
            // toastMessage('error', 'We are facing some technical issue');
            // const errorObj = { ...error }
            // throw errorObj;
        }
    }
);

const initialState = {
    findAll: [],
    findOne: {}
}

export const productSlice = createSlice({
    name: 'productSlice',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(productFindAll.fulfilled, (state, action) => {
            // state.findAll = action.payload.data;
        });
        builder.addCase(productFindOne.fulfilled, (state, action) => {
            // state.findOne = action.payload.data;
        });
    }
});