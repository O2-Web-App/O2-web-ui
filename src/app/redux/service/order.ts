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
        payment_id: number;
        total_cart_value: number;
        province_uuid: string;
        final_total: number;
        delivery_price: number;
        email: string;
        phone_number: string;
        current_address: string;
        google_map_link: string;
        remarks: string;
      }
    >({
      query: ({
        payment_id,
        final_total,
        delivery_price,
        total_cart_value,
        province_uuid,
        email,
        phone_number,
        current_address,
        google_map_link,
        remarks,
      }) => ({
        url: `api/orders/confirm_order`,
        method: "POST",
        body: {
          payment_id,
          final_total,
          delivery_price,
          total_cart_value,
          province_uuid,
          email,
          phone_number,
          current_address,
          google_map_link,
          remarks,
        },
      }),
    }),
  }),
});

export const { useCreateOrderMutation, useCreateComfirmOrderMutation } =
  orderAPI;
