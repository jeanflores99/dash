import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { PersonEntity } from './dtos/person.entity';

export interface PersonState {
  person: PersonEntity
}

const initialState: PersonState = {
  person: {} as any
}

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {
    setPerson: (state, action: PayloadAction<PersonEntity>) => {
      state.person = action.payload as any;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }: PayloadAction<PersonState>) => {
      return { ...state, ...payload.person }
    }
  }
});

export const personReducer = personSlice.reducer;

export const personActions = personSlice.actions;