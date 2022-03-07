import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { IScheduleEntity } from "./dtos/schedule.entity";

export interface ScheduleState {
  schedules: ResponsePaginateDto<IScheduleEntity>;
  schedule: IScheduleEntity;
  option: string;
}

const initialState: ScheduleState = {
  schedules: {
    items: [],
    meta: {
      totalItems: 0,
      totalPages: 0,
      itemsPerPage: 0,
    },
  },
  option: "",
  schedule: {} as any,
};

const scheduleStore = createSlice({
  name: "escalafon@schedule",
  initialState,
  reducers: {
    paginate: (
      state,
      { payload }: PayloadAction<ResponsePaginateDto<IScheduleEntity>>
    ) => {
      state.schedules = payload as any;
    },
    setSchedule: (state, { payload }: PayloadAction<IScheduleEntity>) => {
      state.schedule = payload;
    },
    findSchedule: (state, { payload }: PayloadAction<number>) => {
      const schedule = state.schedules?.items?.find((i) => i.id == payload);
      if (schedule) state.schedule = schedule;
    },
    changeOption: (state, { payload }: PayloadAction<string>) => {
      state.option = payload;
    },
  },
  extraReducers: {
    [HYDRATE](state, { payload }: PayloadAction<any>) {
      return { ...state, ...payload.schedule };
    },
  },
});

export const scheduleReducer = scheduleStore.reducer;

export const scheduleActions = scheduleStore.actions;
