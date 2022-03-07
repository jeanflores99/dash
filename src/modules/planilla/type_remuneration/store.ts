import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MetaDto } from '@services/dtos';
import { HYDRATE } from 'next-redux-wrapper';
import { TypeRemuneration } from './dtos/type_remuneration.entity';

export interface TypeRemunerationState {
  type_remunerations: {
    meta: MetaDto,
    items: TypeRemuneration[]
  },
  type_remuneration: TypeRemuneration | any
}

const initialState: TypeRemunerationState = {
  type_remunerations: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    }
  },
  type_remuneration: {} as any
}
const type_remunerationStore = createSlice({
  name: 'planilla@type_remuneration',
  initialState,
  reducers: {
    paginate: (state, { payload }: PayloadAction<{ meta: MetaDto, items: TypeRemuneration[] }>) => {
      state.type_remunerations = payload;
    },
    find: (state, { payload }: PayloadAction<TypeRemuneration | null>) => {
      state.type_remuneration = payload;
    }
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.type_remuneration }
    },
  }
});

export const type_remunerationReducer = type_remunerationStore.reducer;

export const { paginate, find } = type_remunerationStore.actions;