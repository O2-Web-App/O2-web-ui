import {o2API} from "../api";
import {RecommendationType} from "@/app/types/ProductDetail";

export const productApi = o2API.injectEndpoints({
    endpoints: (builder) => ({
        // get product detail by uuid
        getProductDetailByUUID: builder.query<any, { uuid: string }>({
            query: ({uuid}) => ({
                url: `api/products/${uuid}`,
                method: "GET",
            }),
        }),

        // get recommendation product
        getRecommendationProduct: builder.query<RecommendationType, void>({
            query: () => ({
                url: `api/products/recommended`,
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetProductDetailByUUIDQuery,
    useGetRecommendationProductQuery
} = productApi;