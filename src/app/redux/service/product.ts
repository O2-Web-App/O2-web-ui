import { o2API} from "../api";
export const productApi = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // get product detail
    getProductDetailByUUID: builder.query<any, { uuid: string }>({
      query: ({ uuid }) => ({
        url: `http://178.128.115.99/api/products/${uuid}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProductDetailByUUIDQuery } = productApi;
