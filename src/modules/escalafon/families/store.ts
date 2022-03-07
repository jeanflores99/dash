import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IFamilyEntity } from "./dtos/family.entity.dto";

export interface FamilyState {
  families: ResponsePaginateDto<IFamilyEntity>;
}

const initialState: FamilyState = {
  families: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    },
  },
};

const familyStore = createSlice({
  name: "escalafon@family",
  initialState,
  reducers: {
    paginate: (
      state,
      { payload }: PayloadAction<ResponsePaginateDto<IFamilyEntity>>
    ) => {
      state.families = payload as any;
    },
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.family };
    },
  },
});

export const familyReducer = familyStore.reducer;

export const familyActions = familyStore.actions;
