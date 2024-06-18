
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ProductPostDataType } from '../../../interfaces';
import { getProductServer, EditProduct, DeleteProduct } from '../../../services';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await getProductServer();
  return response.data.result.data;
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async (product: ProductPostDataType) => {
    await EditProduct(product);
    return product;
  }
);

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (id: string) => {
  await DeleteProduct(id);
  return id;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex((product) => product.id === action.payload.id);
        if (index !== -1) {
          state.products[index] = action.payload;
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter((product) => product.id !== action.payload);
      });
  },
});

export default productsSlice.reducer;
