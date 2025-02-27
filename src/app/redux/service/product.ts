import { o2API } from "../api";
export const productApi = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get product detail
    getProductDetailByUUID: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `api/products/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductDetailByUUIDQuery } = productApi;
