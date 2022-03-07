import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDto } from '@services/dtos';
import { HYDRATE } from 'next-redux-wrapper';
import { TypeAportacion } from './dtos/type_aportacion.enitity';

export interface TypeAportacionState {
  type_aportaciones: {
    meta: MetaDto,
    items: TypeAportacion[]
  },
  type_aportacion: TypeAportacion | null
}
const initialState: TypeAportacionState = {
  type_aportaciones: {
    meta: {
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0
    },
    items: []
  },
  type_aportacion: {} as any
}
const type_aportacionStore = createSlice({
  name: 'planilla@type_aportacion',
  initialState,
  reducers: {
    paginate: (state, { payload }: PayloadAction<{ meta: MetaDto, items: TypeAportacion[] }>) => {
      state.type_aportaciones = payload
    },
    find: (state, { payload }: PayloadAction<TypeAportacion | null>) => {
      state.type_aportacion = payload
    }
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.type_aportacion }
    }
  }
})
export const type_aportacionReducer = type_aportacionStore.reducer

export const { paginate, find } = type_aportacionStore.actions