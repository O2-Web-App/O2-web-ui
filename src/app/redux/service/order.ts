import { Province } from "@/app/types/Province";
import { o2API } from "../api";
export const orderAPI = o2API.injectEndpoints({
  endpoints: (builder) => ({
    // create order total amount
    createOrder: builder.mutation<
      any,
      { province_uuid: string; coupon_code: string }
    >({
      query: ({ province_uuid, coupon_code }) => ({
        url: `api/orders/get-total-amount`,
        method: "POST",
        body: { province_uuid, coupon_code },
      }),
    }),

    // create order total amount
    createComfirmOrder: builder.mutation<
      any,
      {
        email: string;
        phone_number: string;
        province_uuid: string;
        google_map_link: string;
        remarks: string;
        md5_hash: string;
      }
    >({
      query: ({
        email,
        phone_number,
        province_uuid,
        google_map_link,
        remarks,
        md5_hash,
      }) => ({
        url: `api/orders/confirm_order`,
        method: "POST",
        body: {
          email,
          phone_number,
          province_uuid,
          google_map_link,
          remarks,
          md5_hash,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useCreateComfirmOrderMutation } =
  orderAPI;
