import {o2API} from "../api";
import {RecommendationType} from "@/app/types/ProductDetail";

export const productApi = o2API.injectEndpoints({
    endpoints: (builder) => ({
        // get product detail
        getProductDetailByUUID: builder.query<any, { uuid: string }>({
            query: ({uuid}) => ({
                url: `api/products/${uuid}`,
                method: "GET",
            }),
            providesTags: ["Product"],
        }),

        // get recommendation product
        getRecommendationProduct: builder.query<RecommendationType, void>({
            query: () => ({
                url: `api/products/recommended`,
                method: "GET",
            }),
        }),


        //Popular Product
        getPopularProduct: builder.query<any, void>({
            query: () => ({
                url: `api/products/popular-products`,
                method: "GET",
            }),
        }),

        //Get PreOrder Product
        getPreOrderProduct: builder.query<RecommendationType, void>({
            query: () => ({
                url: `api/products/preorders`,
                method: "GET",
            }),
        }),

        //Get Discount Product
        getDiscountProduct: builder.query<any, void>({
            query: () => ({
                url: `api/products/discounted`,
                method: "GET",
            }),
        }),


        //Get Feedback
        getFeedback: builder.query<any, void>({
            query: () => ({
                url: `api/feedbacks/promoted`,
                method: "GET",
            }),
        }),


        //update_cart_quantity
        CreateUserFeedbackProductQuery: builder.mutation<
            any,
            { product_uuid: string; comment: string; rating: number }
        >({
            query: ({product_uuid, comment, rating}) => ({
                url: `api/product-feedbacks/submit`,
                method: "POST",
                body: {product_uuid, comment, rating},
            }),
            invalidatesTags: ["Product"],
        }),
    }),
});

export const {
    useGetProductDetailByUUIDQuery,
    useGetRecommendationProductQuery,
    useGetPopularProductQuery,
    useGetDiscountProductQuery,
    useGetPreOrderProductQuery,
    useGetFeedbackQuery,
    useCreateUserFeedbackProductQueryMutation
} = productApi;
