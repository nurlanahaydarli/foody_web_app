// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ProductPostDataType} from "../../../interfaces";
import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const url = {
    baseUrl:"/api"
} as FetchBaseQueryArgs;
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(url),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductPostDataType, any>({
            query() {
                return {
                    url: 'products',
                };
            },
            transformResponse: response => {
                return response?.result?.data||[];
            },
            providesTags: ['Product']
        }),
        createProduct: builder.mutation<any, any>({
            query(data) {
                return {
                    url: 'products',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<any, any>({
            query(productId) {
                return {
                    url: `products/${productId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Product'],
        }),
        editProduct: builder.mutation<any, any>({
            query(data,productId) {
                return {
                    url: `products/${productId}`,
                    method: 'PUT',
                    data
                };
            },
            invalidatesTags: ['Product'],
        }),
    }),
})


export const { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation,useEditProductMutation } = productsApi