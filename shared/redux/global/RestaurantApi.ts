import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RestaurantPostDataType } from "../../interfaces";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const url = {
    baseUrl:"/api"
} as FetchBaseQueryArgs;

export const restaurantsApi = createApi({
    reducerPath: 'restaurantsApi',
    baseQuery: fetchBaseQuery(url),
    tagTypes: ['Restuarant'],
    endpoints: (builder) => ({
        getRestuarants: builder.query<RestaurantPostDataType[], any>({
            query() {
                return {
                    url: '/restuarants',
                };
            },
            transformResponse: response => {
                console.log('res', response);
                const result = response as any;
                return result.result.data;
            },
            providesTags:['Restuarant']
        }),
        createRestuarant: builder.mutation<any, any>({
            query(data:any) {
                return {
                    url: '/restuarants',
                    method: 'POST',
                    body: data,
                };
            },
            invalidatesTags: ['Restuarant'],
        }),
        deleteRestuarant: builder.mutation<any, any>({
            query(restuarantId: any){
                return {
                    url: `/restuarants/${restuarantId}`,
                    method: 'DELETE'
                };
            },
            invalidatesTags: ['Restuarant'],

        }),
        editRestuarant: builder.mutation<any, any>({
            query(data) {
                console.log("dataaa",data);
                let id = data.id;
                delete data.id;
                return {
                    url: `/restuarants/${id}`,
                    method: 'PUT',
                    body: data
                };
            },
            invalidatesTags: ['Restuarant']
        }),
    }),
})

export const { useGetRestuarantsQuery, useCreateRestuarantMutation, useDeleteRestuarantMutation, useEditRestuarantMutation} = restaurantsApi