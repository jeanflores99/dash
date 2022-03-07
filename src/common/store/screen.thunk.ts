import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface ScreenState {
  title: string;
  width: number;
  height: number;
  wrapper: boolean;
  mode: string | null;
  dark: boolean;
}

const initialState: ScreenState = {
  title: '',
  width: 0,
  height: 0,
  wrapper: false,
  mode: null,
  dark: false
}

const getMode = (size: number): any => {
  let data = [
    { name: "xxl", size: 1400 },
    { name: "xl", size: 1200 },
    { name: "lg", size: 992 },
    { name: "md", size: 768 },
    { name: "sm", size: 576 },
    { name: "xs", size: 576 },
  ]

  let response = data.find((d, index) => {
    let isLastItem = (data.length - 1) == index;
    if (!isLastItem && d.size <= size) return true;
    if (isLastItem && d.size > size) return true;
    return false;
  })

  return response?.name || null;
}

export const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    resizeScreen: (state) => {
      const limit = 1350;
      state.width = window.innerWidth
      state.height = window.innerHeight
      if (limit >= state.width) state.wrapper = true;
      else state.wrapper = false;
      state.mode = getMode(state.width);
    },
    wrapperScreen: (state) => {
      state.wrapper = !state.wrapper
    },
    defaultTheme: (state) => {
      state.dark = localStorage?.getItem('dark') == "1";
      document.body.className = state.dark ? 'dark-only' : 'light';
    },
    toggleTheme: (state) => {
      state.dark = !state.dark;
      document.body.className = state.dark ? 'dark-only' : 'light'
      localStorage.setItem('dark', state.dark ? "1" : "0");
    }
  },
  extraReducers: {
    [HYDRATE]: (state, { payload }: PayloadAction<any>) => {
      return { ...state, ...payload.screen }
    }
  }
})

export const screenReducer = screenSlice.reducer;

export const {
  setTitle,
  resizeScreen,
  wrapperScreen,
  defaultTheme,
  toggleTheme
} = screenSlice.actions;