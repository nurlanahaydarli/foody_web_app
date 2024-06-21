// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {ProductPostDataType} from "../../../interfaces";
import {FetchBaseQueryArgs} from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

interface IResult {

}


const url = {
    baseUrl:"/api"
} as FetchBaseQueryArgs;
export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery(url),
    tagTypes: ['Product'],
    endpoints: (builder) => ({
        getProducts: builder.query<ProductPostDataType[], any>({
            query() {
                return {
                    url: '/products',
                };
            },
            transformResponse: response => {
                const result = response as any;
             return result.result.data;
            },
            providesTags: ['Product']
        }),
        createProduct: builder.mutation<any, any>({
            query(data:any) {
                return {
                    url: '/products',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Product'],
        }),
        deleteProduct: builder.mutation<any, any>({
            query(productId:any) {
                return {
                    url: `/products/${productId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Product'],
        }),
        editProduct: builder.mutation<any, any>({
            query(data) {
                console.log(
                    'daa',data
                )
                let id = data.id;
                delete data.id;
                return {
                    url: `/products/${id}`,
                    method: 'PUT',
                    body:data
                };
            },
            invalidatesTags: ['Product'],
        }),
    }),
})


export const { useGetProductsQuery,useCreateProductMutation,useDeleteProductMutation,useEditProductMutation } = productsApi