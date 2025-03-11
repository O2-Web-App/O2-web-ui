import {
  createApi,
  fetchBaseQuery,
  FetchBaseQueryError,
  QueryReturnValue,
  BaseQueryApi,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./store";
import { setAccessToken } from "./features/auth/authSlice";

// ✅ BaseQueryArgs Type Definition
type BaseQueryArgs = {
  url: string;
  method: string;
  body?: unknown; // Define more precisely if needed
  headers?: HeadersInit;
};

// ✅ Change to `Record<string, unknown>` instead of `{}` for better type safety
type BaseQueryOptions = Record<string, unknown>;

// ✅ Fetch Base Query with Authorization Header
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_O2_API_URL,
  prepareHeaders: (headers, { getState }) => {
    let token = (getState() as RootState).auth.token;

    // 🔥 Fallback to localStorage if Redux is empty (useful after page reload)
    if (!token) {
      token = localStorage.getItem("access_token") || "";
    }

    console.log("🔑 Token Retrieved for API Call:", token); // Debugging

    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    } else {
      console.warn("⚠️ No access token found in Redux or LocalStorage!");
    }

    return headers;
  },
  credentials: "include", // ✅ Send cookies for refresh token authentication
});

// ✅ Define the return type for baseQueryWithReAuth
type BaseQueryReturnType = QueryReturnValue<
  unknown,
  FetchBaseQueryError,
  Record<string, unknown>
>;

// ✅ Re-authentication logic to refresh expired token
const baseQueryWithReAuth = async (
  args: BaseQueryArgs,
  api: BaseQueryApi,
  extraOptions: BaseQueryOptions
): Promise<BaseQueryReturnType> => {
  let result = await baseQuery(args, api, extraOptions);

  console.log("📡 API Request Details:", args);
  console.log("🔍 URL:", args.url);
  console.log("🔍 Method:", args.method);

  if (result.error?.status === 401) {
    console.warn("🚨 Unauthorized! Attempting token refresh...");

    try {
      const refreshResponse = await fetch(`/api/refresh`, {
        method: "POST",
        credentials: "include",
      });

      if (refreshResponse.ok) {
        const refreshData = await refreshResponse.json();
        console.log("✅ New Access Token Retrieved:", refreshData.access_token);

        // ✅ Store new access token in Redux & LocalStorage
        api.dispatch(setAccessToken(refreshData.access_token));
        localStorage.setItem("access_token", refreshData.access_token);

        // ✅ Retry the failed request with the new token
        const newHeaders = new Headers(args.headers);
        newHeaders.set("Authorization", `Bearer ${refreshData.access_token}`);

        const updatedArgs = { ...args, headers: newHeaders };
        result = await baseQuery(updatedArgs, api, extraOptions);
      } else {
        //console.error("❌ Refresh token failed (401). Logging out...");

        // ✅ Attempt logout if refresh fails
        await fetch(`/api/logout`, {
          method: "POST",
          credentials: "include",
        });

        // ✅ Clear access token in Redux & LocalStorage
        api.dispatch(setAccessToken(null));
        localStorage.removeItem("access_token");
      }
    } catch (error) {
      console.error("🚨 Token Refresh Error:", error);
      api.dispatch(setAccessToken(null));
      localStorage.removeItem("access_token");
    }
  }

  return result;
};

// ✅ Create the API service with Redux Toolkit's `createApi`
export const o2API = createApi({
  tagTypes: [
    "userTest",
    "userDraft",
    "userProfile",
    "SingleChat",
    "bookmarks",
    "AllTestAsess",
    "AllChats",
    "WishList",
    "Blogs",
    "Carts",
  ],
  reducerPath: "o2API",
  baseQuery: baseQueryWithReAuth, // ✅ Use the custom base query with re-authentication
  endpoints: () => ({}),
});
