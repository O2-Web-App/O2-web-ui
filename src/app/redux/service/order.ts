import { Province } from "@/app/types/Province";
import { o2API } from "../api";
export const orderAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // create order total amount
    createOrder: builder.mutation<
      any,
      { province_uuid: Province; coupon_code: string }
    >({
      query: ({ province_uuid, coupon_code }) => ({
        url: `api/orders/get-total-amount`,
        method: "POST",
        body: { province_uuid, coupon_code },
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderAPI;
