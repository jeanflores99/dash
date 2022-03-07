import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IClientEntity } from "./dtos/client.entity";

export interface ClientState {
  client: IClientEntity;
}

const initialState: ClientState = {
  client: {} as any,
};

export const clientSlice = createSlice({
  name: "person",
  initialState,
  reducers: {
    setClient: (state, action: PayloadAction<IClientEntity>) => {
      state.client = action.payload as IClientEntity;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }: PayloadAction<any>) => {
      return { ...state, ...payload.client };
    },
  },
});

export const clientReducer = clientSlice.reducer;

export const clientActions = clientSlice.actions;
