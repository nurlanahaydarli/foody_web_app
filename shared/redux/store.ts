import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userReducer from '../redux/featuries/user/userSılice';
import sidebarReducer from './featuries/sidebar/sidebarSlice';
import productsReducer from './featuries/product/productsSlice';
import restaurantsReducer  from './featuries/restaurants/restaurantsSlice';
const makeStore = () =>
    configureStore({
        reducer: {
            user: userReducer,
            sidebar: sidebarReducer,
            products: productsReducer,
            restaurants: restaurantsReducer,
        },
    });

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];

export const wrapper = createWrapper(makeStore);
