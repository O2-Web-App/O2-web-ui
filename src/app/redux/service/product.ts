import {o2API} from "../api";
import {RecommendationType} from "@/app/types/ProductDetail";

export const productApi = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get product detail
    getProductDetailByUUID: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
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

    //update_cart_quantity
    CreateUserFeedbackProductQuery: builder.mutation<
      any,
      { product_uuid: string; comment: string; rating: number }
    >({
      query: ({ product_uuid, comment, rating }) => ({
        url: `api/product-feedbacks/submit`,
        method: "POST",
        body: { product_uuid, comment, rating },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
    useGetProductDetailByUUIDQuery ,
    useGetRecommendationProductQuery,
    useCreateUserFeedbackProductQueryMutation
} = productApi;
