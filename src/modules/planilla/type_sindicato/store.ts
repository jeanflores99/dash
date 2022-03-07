import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDto } from '@services/dtos';
import { HYDRATE } from 'next-redux-wrapper';
import { TypeSindicato } from './dtos/type_sindicato.entity';

export interface TypeSindicatoState {
  type_sindicatos: {
    meta: MetaDto,
    items: TypeSindicato[]
  },
  type_sindicato: TypeSindicato | null
}

const initialState: TypeSindicatoState = {
  type_sindicatos: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    }
  },
  type_sindicato: {} as any
}
const type_sindicatoStore = createSlice({
  name: 'planilla@type_sindicato',
  initialState,
  reducers: {
    paginate: (state, { payload }:
      PayloadAction<{ meta: MetaDto, items: TypeSindicato[] }>) => {
      state.type_sindicatos = payload;
    },
    find: (state, { payload }: PayloadAction<TypeSindicato | null>) => {
      state.type_sindicato = payload;
    }
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.type_sindicato }
    },
  }
});

export const type_sindicatoReducer = type_sindicatoStore.reducer;

export const { paginate, find } = type_sindicatoStore.actions;