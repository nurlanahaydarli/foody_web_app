import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from '../redux/featuries/user/userSılice';
import sidebarReducer from './featuries/sidebar/sidebarSlice';
import {productsApi} from "./api/products/productsApi";

const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            sidebar: sidebarReducer,
            [productsApi.reducerPath]:productsApi.reducer
        },
        middleware(getDefaultMiddleware) {
            return getDefaultMiddleware().concat(
                productsApi.middleware
            )
        },
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
