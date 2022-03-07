import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDto } from '@services/dtos';
import { HYDRATE } from 'next-redux-wrapper';
import { TypeCategoria } from './dtos/type_categoria.entity';

export interface TypeCategoriaState {
  typecategorias: {
    meta: MetaDto,
    items: TypeCategoria[]
  },
  typecategoria: TypeCategoria | null
}
const initialState: TypeCategoriaState = {
  typecategorias: {
    meta: {
      totalItems: 0,
      itemsPerPage: 0,
      totalPages: 0
    },
    items: []
  },
  typecategoria: {} as any
}
const TypeCategoriaStore = createSlice({
  name: 'planilla@type_categoria',
  initialState,
  reducers: {
    paginate: (state, { payload }: PayloadAction<{ meta: MetaDto, items: TypeCategoria[] }>) => {
      state.typecategorias = payload
    },
    find: (state, { payload }: PayloadAction<TypeCategoria | null>) => {
      state.typecategoria = payload
    }
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.typecategoria }
    }
  }
})
export const type_categoriaReducer = TypeCategoriaStore.reducer

export const { find, paginate } = TypeCategoriaStore.actions