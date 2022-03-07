import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MetaDto } from "@services/dtos";
import { HYDRATE } from "next-redux-wrapper";
import { IContractEntity } from "./dtos/contract.entity";

export interface WorkState {
  contracts: {
    meta: MetaDto;
    items: IContractEntity[];
  };
  contract: IContractEntity | null;
  option: string;
}

const initialState: WorkState = {
  contracts: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    },
  },
  contract: {} as any,
  option: "",
};

const contractStore = createSlice({
  name: "escalafon@contracts",
  initialState,
  reducers: {
    paginate: (
      state,
      { payload }: PayloadAction<{ meta: MetaDto; items: IContractEntity[] }>
    ) => {
      state.contracts = payload;
    },
    find: (state, { payload }: PayloadAction<IContractEntity | null>) => {
      state.contract = payload;
    },
    changeOption: (state, { payload }: PayloadAction<string>) => {
      state.option = payload;
    },
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.contract };
    },
  },
});

export const contractReducer = contractStore.reducer;

export const contractActions = contractStore.actions;
