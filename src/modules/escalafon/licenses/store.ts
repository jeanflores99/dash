import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { ILicenseEntity } from "./dtos/license.entity";

export interface LicenseState {
  licenses: ResponsePaginateDto<ILicenseEntity>;
  license: ILicenseEntity;
  option: string;
}

const initialState: LicenseState = {
  licenses: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    },
  },
  option: "",
  license: {} as any,
};

const licenseStore = createSlice({
  name: "escalafon@family",
  initialState,
  reducers: {
    paginate: (
      state,
      { payload }: PayloadAction<ResponsePaginateDto<ILicenseEntity>>
    ) => {
      state.licenses = payload as any;
    },
    setLicense: (state, { payload }: PayloadAction<ILicenseEntity>) => {
      state.license = payload;
    },
    changeOption: (state, { payload }: PayloadAction<string>) => {
      state.option = payload;
    },
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.license };
    },
  },
});

export const licenseReducer = licenseStore.reducer;

export const licenseActions = licenseStore.actions;
