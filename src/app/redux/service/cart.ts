import { o2API } from "../api";
export const cartAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // add to cart
    createAddToCart: builder.mutation<any, {product_uuid: string; quantity: number }>({
      query: ({product_uuid, quantity}) => ({
        url: `carts/add`,
        method: "POST",
        body: {product_uuid, quantity},
      }),
      invalidatesTags: ["Carts"],
    }),
  }),
});

export const { useCreateAddToCartMutation } = cartAPI;
