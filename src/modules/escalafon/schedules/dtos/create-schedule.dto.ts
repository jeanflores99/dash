import { ScheduleModeEnum } from "./schedule.entity";

export interface ICreateScheduleDto {
  date: string;
  checkInTime: string;
  tolerance: number;
  observation?: string;
  mode: ScheduleModeEnum;
}

export interface ICreateCollectionScheduleDto {
  contractId: number;
  entry: ICreateScheduleDto;
  exit: ICreateScheduleDto;
}
