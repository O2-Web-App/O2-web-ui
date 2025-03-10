import { o2API } from "../api";
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
  useGetProductDetailByUUIDQuery,
  useCreateUserFeedbackProductQueryMutation,
} = productApi;
