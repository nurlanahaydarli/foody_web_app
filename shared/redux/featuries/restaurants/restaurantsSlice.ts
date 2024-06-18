import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRestaurants } from '../../../services';


export const fetchRestaurants = createAsyncThunk('restaurants/fetchRestaurants', async () => {
  const response = await getRestaurants();
  return response.data.result.data;
});

const restaurantsSlice = createSlice({
  name: 'restaurants',
  initialState: {
    restaurants: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRestaurants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchRestaurants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.restaurants = action.payload;
      })
      .addCase(fetchRestaurants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default restaurantsSlice.reducer;
