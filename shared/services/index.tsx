import {
    RestaurantSingleApiResponse,
    PostDataType,
    BasketPostDataType,
    RestaurantApiResponse,
    CategoryApiResponse,
    CategoryPostDataType,
    InitialCategoryState,
    ApiResponse,
    ProductApiResponse,
    ProductPostDataType,
    InitialProductState,
     InitialRestaurantState,
    RestaurantPostDataType,

} from "../interfaces/";
import { AxiosPromise } from "axios";
import { instanceAxios } from "../helpers/instanceAxios";


//  =============================== GET CATEGORY ===============================
export const getCategories = (): AxiosPromise<CategoryApiResponse> =>
    instanceAxios({ method: "GET", url: "category" });



export const searchRestaurants = (query: string): AxiosPromise<RestaurantApiResponse> =>
    instanceAxios({ method: 'GET', url: `restuarants`, params: { name: query } });

// =============================== GET RESTAURANT_BY_ID ===============================
export const getRestaurantById = (
    restaurantID: string | number
): AxiosPromise<RestaurantSingleApiResponse> =>
    instanceAxios({
        method: "GET",
        url: `restuarants/${restaurantID}`,
    });

// =============================== GET BASKET ===============================
export const GetBasket = (): AxiosPromise => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "GET",
        url: "basket",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

//===============================  ADD BASKET ===============================
export const AddBasket: (
    basketProduct: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "POST",
        url: `basket/add`,
        data: basketProduct,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// =============================== DELETE BASKET ===============================
export const deleteBasket: (
    basketProduct: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketProduct) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "DELETE",
        url: `basket/delete`,
        data: basketProduct,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};

// =============================== CLEAR BASKET ===============================
export const clearBasket: (
    basketId: BasketPostDataType
) => AxiosPromise<BasketPostDataType> = (basketId) => {
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "DELETE",
        url: `basket/clear`,
        data: basketId,
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
};


// =============================== ADD CATEGORY ===============================
export const PostCategory: (newCategory: InitialCategoryState) => AxiosPromise<CategoryPostDataType> = (newCategory) => 
    {
    return instanceAxios({
        method: "POST",
        url: 'category',
        data: newCategory,
    });
};

// =============================== DELETE CATEGORY ===============================
export const DeleteCategory = (
    categoryId: string | number
): AxiosPromise<CategoryApiResponse> =>
    instanceAxios({
        method: "DELETE",
        url: `category/${categoryId}`,
    });

// =============================== EDIT CATEGORY ===============================
export const EditCategory = ( editedCategory: CategoryPostDataType ): AxiosPromise<CategoryApiResponse> => {
    return instanceAxios({
        method: "PUT",
        url: `category/${editedCategory.id}`,
        data: editedCategory,
    });
};

// =============================== GET PRODUCTS ===============================
export const getProducts = (): AxiosPromise<ProductApiResponse> =>
    instanceAxios({ method: "GET", url: 'products' });


// =============================== ADD PRODUCT ===============================
export const PostProduct: (
    newCategory: InitialProductState
) => AxiosPromise<ProductPostDataType> = (newProduct) => {
    return instanceAxios({
        method: "POST",
        url: 'products',
        data: newProduct,
    });
};


// =============================== DELETE PRODUCT ===============================
export const DeleteProduct = (
    productId: string | number
): AxiosPromise<ProductApiResponse> =>
    instanceAxios({
        method: "DELETE",
        url: `products/${productId}`,
    });

    // =============================== EDIT PRODUCT ===============================
    export const EditProduct = (
        editedProduct: ProductPostDataType
    ): AxiosPromise<ProductApiResponse> => {
        return instanceAxios({
            method: "PUT",
            url: `products/${editedProduct.id}`,
            data: editedProduct,
        });
    };
// =============================== GET ORDERS  ===============================
export async function getOrder() {
    try {
        const accessToken = localStorage.getItem("access_token");
        const response = await instanceAxios.get(`/order`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response
    } catch (error) {
        console.log("order's error: ", error);
    }
}



// =============================== DELETE ORDERS ===============================

export const deleteOrder = async (id: string | number) => {
    try {
        let item: any = localStorage.getItem("access_token")
        let accessToken = JSON.parse(item)

        const response = await instanceAxios.delete(`/order`, {
            data: {
                "order_id": id,
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });
        return response;
    } catch (error) {
        console.log(error)
    }
}

// =============================== DELETE ORDER ===============================
export const DeleteOrder = (
    OrderID: string | number
) =>{
    const accessToken = localStorage.getItem("access_token");
    instanceAxios({
        method: "DELETE",
        url: `order`,
        data:{
            order_id:OrderID
        },
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });


}
// =============================== GET ORDER HISTORY ===============================
export const GetOrderHistory = () =>{
   
    const accessToken = localStorage.getItem("access_token");
    return instanceAxios({
        method: "GET",
        url: "order/history",
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    })
}
    
    // =============================== PUT AUTH USER ===============================

    export const PutAuthUser = (body:object) =>{
   
        const accessToken = localStorage.getItem("access_token");
        return instanceAxios({
            method: "GET",
            url: "auth/user",
            data:body,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
    }


    // =============================== GET RESTAURANT ===============================
export const getRestaurants = (): AxiosPromise<RestaurantApiResponse> =>
    instanceAxios({ method: "GET", url: "restuarants" });




// =============================== ADD RESTAURANT ===============================

export const PostRestaurant: ( newRestaurant: InitialRestaurantState ) => AxiosPromise<RestaurantPostDataType> = (newRestaurant) => {
    return instanceAxios({
        method: "POST",
        url: 'restuarants',
        data: newRestaurant,
    });
};




// =============================== EDIT RESTAURANT ===============================
export const EditRestaurant = ( editedRestaurant: RestaurantPostDataType ): AxiosPromise<RestaurantApiResponse> => {
    return instanceAxios({
        method: "PUT",
        url: `restuarants/${editedRestaurant.id}`,
        data: editedRestaurant,
    });
};
