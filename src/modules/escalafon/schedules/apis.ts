import { scaleRequest } from "@services/scale.request";
import { ICreateCollectionScheduleDto } from "./dtos/create-schedule.dto";
import { IEditScheduleDto } from "./dtos/edit-schedule.dto";
import { FilterGetSchedulesDto } from "./dtos/filter-schedule.dto";
import { IScheduleEntity } from "./dtos/schedule.entity";

const request = scaleRequest();

export const getSchedulesToContract = async (
  id: number,
  { page, querySearch, limit, year, month }: FilterGetSchedulesDto
) => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("querySearch", querySearch || "");
  params.set("limit", `${limit || 30}`);
  if (year) params.set("year", `${year}`);
  if (month) params.set("month", `${month}`);
  // response
  return await request
    .get(`contracts/${id}/schedules`, { params })
    .then((res) => res.data);
};

export const createSchedule = async (
  payload: ICreateCollectionScheduleDto
): Promise<IScheduleEntity> => {
  return await request.post(`schedules`, payload).then((res) => res.data);
};

export const editSchedule = async (
  id: number,
  payload: IEditScheduleDto
): Promise<IScheduleEntity> => {
  return await request.put(`schedules/${id}`, payload).then((res) => res.data);
};

export const deleteSchedule = async (
  id: number
): Promise<{ deleted: boolean }> => {
  return await request.destroy(`schedules/${id}`).then((res) => res.data);
};
