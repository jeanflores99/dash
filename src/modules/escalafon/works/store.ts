import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { WorkEntity } from "./dtos/work.entity";

export interface WorkState {
  works: ResponsePaginateDto<WorkEntity>;
  work: WorkEntity | null;
  tabIndex: number;
  option: string;
}

const initialState: WorkState = {
  works: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    },
  },
  work: {} as any,
  tabIndex: 0,
  option: "",
};

const workStore = createSlice({
  name: "escalafon@works",
  initialState,
  reducers: {
    paginate: (
      state,
      { payload }: PayloadAction<ResponsePaginateDto<WorkEntity>>
    ) => {
      state.works = payload as any;
    },
    find: (state, { payload }: PayloadAction<WorkEntity | null>) => {
      state.work = payload as any;
    },
    changeTab: (state, { payload }: PayloadAction<number>) => {
      state.tabIndex = payload;
    },
    changeOption: (state, { payload }: PayloadAction<string>) => {
      state.option = payload;
    },
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.work };
    },
  },
});

export const workReducer = workStore.reducer;

export const workActions = workStore.actions;
