import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface BasketState {
    id: string;
    name: string;
    category_id: string;
    img_url: string;
    cuisine: string;
    address: string;
    delivery_min: number,
    delivery_price: number
}

const initialState: BasketState = {
    id: '',
    name: '',
    category_id: '',
    img_url: '',
    cuisine: '',
    address: '',
    delivery_min: 0,
    delivery_price: 0


};

const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        setBasket: (state, action: PayloadAction<BasketState>) => {
            return action.payload;
        },
        clearBasket: () => {
            return initialState;
        },
        updateBasket: (state, action: PayloadAction<Partial<BasketState>>) => {
            return {...state, ...action.payload};
        },
        removeBasketItem: (state, action: PayloadAction<Partial<BasketState>>) => {
            return {...state, ...action.payload};
        },
    },
});

export const {setBasket, clearBasket, updateBasket, removeBasketItem} = basketSlice.actions;

export default basketSlice.reducer;