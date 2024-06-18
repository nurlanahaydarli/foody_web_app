import {AxiosResponse} from "axios";


export interface BasketPostDataType {
    id?: string | number | any;
    basket_id?: string | number;
    user_id: string | number;
    product_id?: string | number;
    img_url?: string | null;
    price?: number;
    name?: string;
    count?: number;
    amount?: number;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
}

export interface PostDataType {
    id: number | string;
    name: string;
    description?: string;
    price: number;
    img_url: string;
    rest_id: string;
}
export interface RestaurantSingleApiResponse {
    result: {
        data: {
            id: number | string;
            name: string | undefined;
            category_id: number | string | undefined;
            img_url: string | null | undefined;
            cuisine: string | undefined;
            address: string | undefined;
            delivery_min: number | undefined;
            delivery_price: number | undefined;
            products: PostDataType[];
        };
    };
    status: number;
    message: string;
}
export interface RestaurantApiResponse {
    result: {
        data: RestaurantPostDataType[];
    };
    status: number;
    message: string;
}

export interface RestaurantPostDataType {
    id?: number | string | any;
    category_id: number | string | undefined;
    img_url: string | null | undefined;
    cuisine: string | undefined;
    address: string | undefined;
    delivery_min: number | undefined;
    delivery_price: number | undefined;
    name?: string;
}


export interface InitialRestaurantState
extends Omit<RestaurantPostDataType, "id"> {}


export interface CategoryPostDataType {
    id: number | string | any;
    name: string;
    img_url: File | string | null;
    category: string
}


export interface InitialCategoryState
    extends Omit<CategoryPostDataType, "id"> {}

    


export interface CategoryApiResponse {
    result: {
        data: CategoryPostDataType[];
    };
    status: number;
    message: string;
}

export interface ApiResponse {
    result: {
        data: PostDataType[];
    };
    status: number;
    message: string;
}

export interface BasketPostDataType {
    id?: string | number | any;
    basket_id?: string | number;
    user_id: string | number;
    product_id?: string | number;
    img_url?: string | null;
    price?: number;
    name?: string;
    count?: number;
    amount?: number;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
}

export interface OrderPostDataType {
    id?: string | number | any;
    user_id: string | number;
    basket_id?: string | number;
    img_url?: string | null;
    price?: number | string;
    name?: string;
    count?: number;
    amount?: number;
    delivery_address: number | string | any;
    payment_method: number | string;
    contact: number | string |any;
    created: number | string;
    total_count?: number;
    total_item?: number;
    total_amount?: number;
}

export interface ProductPostDataType{
    id?: string | number | any;
    img_url?: AxiosResponse<string|null>;
    price?: number;
    name?: string;
    description?: string;
    rest_id?: string;
}
export interface ProductApiResponse {
    result: {
        data: ProductPostDataType[];
    };
    status: number;
    message: string;
}
export interface InitialProductState
    extends Omit<ProductPostDataType, "id"> {}