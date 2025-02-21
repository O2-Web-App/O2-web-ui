import { configureStore } from '@reduxjs/toolkit'
import {  O2Api } from './api'
import authSlice from './features/auth/authSlice'
// create store
export const makeStore = () => {
  return configureStore({
    reducer: {
      [O2Api.reducerPath]: O2Api.reducer,
        auth:authSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(O2Api.middleware),
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']