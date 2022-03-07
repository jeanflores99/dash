import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export interface AuthState {
  logged: boolean;
  token: string | null;
  user: any | null;
}

const initialState: AuthState = {
  logged: false,
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setLogged: (state, action: PayloadAction<boolean>) => {
      state.logged = action.payload;
    },
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setUser: (state, action: PayloadAction<any | null>) => {
      state.user = action.payload;
    },
    editUser: (state, action: PayloadAction) => {
      state.user = Object.assign(state.user, action.payload);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }: PayloadAction<any>) => {
      return { ...state, ...payload.auth };
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setLogged, setToken, setUser, editUser, logout } =
  authSlice.actions;
