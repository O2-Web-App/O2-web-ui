import { Province } from "@/app/types/Province";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Province = {
  value: "73e80a00-debf-4dce-a733-bda19af5774d",
  name: "Phnom Penh",
};

export const provinceSlice = createSlice({
  name: "province",
  initialState,
  reducers: {
    setSelectedProvinceUUID: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
    setSelectedProvinceName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { setSelectedProvinceUUID, setSelectedProvinceName } =
  provinceSlice.actions;
export default provinceSlice.reducer;
