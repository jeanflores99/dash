import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDto } from '@services/dtos';
import { HYDRATE } from 'next-redux-wrapper';
import { TypeDescuento } from './dtos/type_descuento.enitity';

export interface TypeDescuentoState {
  type_descuentos: {
    meta: MetaDto,
    items: TypeDescuento[]
  },
  type_descuento: TypeDescuento | null
}
const initialState: TypeDescuentoState = {
  type_descuentos: {
    items: [],
    meta: {
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0
    }
  },
  type_descuento: {} as any
}
const type_descuentoStore = createSlice({
  name: 'planilla@type_descuento',
  initialState,
  reducers: {
    paginate: (state, { payload }: PayloadAction<{ meta: MetaDto, items: TypeDescuento[] }>) => {
      state.type_descuentos = payload
    },
    find: (state, { payload }: PayloadAction<TypeDescuento | null>) => {
      state.type_descuento = payload
    }
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.type_descuento }
    }
  }
})
export const type_descuentoReducer = type_descuentoStore.reducer

export const { find, paginate } = type_descuentoStore.actions