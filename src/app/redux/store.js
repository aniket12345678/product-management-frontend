import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { productSlice } from "../slice/product.slice";

const rootReducer = combineReducers({
    productSlice: productSlice.reducer,
})

export const store = configureStore({
    reducer: rootReducer,
    devTools:true
});