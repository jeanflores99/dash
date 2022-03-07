import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDto } from '@services/dtos';
import { HYDRATE } from 'next-redux-wrapper';
import { Afp } from './dtos/afp.entity';

export interface AfpState {
  afps: {
    meta: MetaDto,
    items: Afp[]
  },
  afp: Afp | null
}
const initialState: AfpState = {
  afps: {
    meta: {
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0
    },
    items: []
  },
  afp: {} as any
}
const AfpStore = createSlice({
  name: 'planilla@afp',
  initialState,
  reducers: {
    paginate: (state, { payload }: PayloadAction<{ meta: MetaDto, items: Afp[] }>) => {
      state.afps = payload
    },
    find: (state, { payload }: PayloadAction<Afp | null>) => {
      state.afp = payload
    }
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.typeaportacion }
    }
  }
})
export const afpReducer = AfpStore.reducer

export const afpActiones = AfpStore.actions