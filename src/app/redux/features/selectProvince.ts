import { Province } from "@/app/types/Province";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Province = {
  value: "73e80a00-debf-4dce-a733-bda19af5774d",
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    setSelectedProvince: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setSelectedProvince } = provinceSlice.actions;
export default provinceSlice.reducer;
