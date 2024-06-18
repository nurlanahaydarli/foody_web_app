import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GetProducts } from '../../../services';
import { ProductPostDataType } from '../../../interfaces';

interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    rest_id: string;
    img_url: string;
}

interface ProductsState {
    productList: Product[];
    loading: boolean;
    error: string | null;
}

const initialState: ProductsState = {
    productList: [],
    loading: false,
    error: null,
};

export const fetchProducts = createAsyncThunk<Product[], void>(
    'products/fetchProducts',
    async () => {
        const response = await GetProducts();
        return response.data.result.data as Product[];
    }
);

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        addProduct: (state, action: PayloadAction<Product>) => {
            state.productList.push(action.payload);
        },
        editProduct: (state, action: PayloadAction<Product>) => {
            const index = state.productList.findIndex(product => product.id === action.payload.id);
            if (index !== -1) {
                state.productList[index] = action.payload;
            }
        },
        deleteProduct: (state, action: PayloadAction<string>) => {
            state.productList = state.productList.filter(product => product.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.productList = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch products';
            });
    },
});

export const { addProduct, editProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
