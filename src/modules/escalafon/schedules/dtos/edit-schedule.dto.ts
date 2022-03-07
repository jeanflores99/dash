import { ScheduleModeEnum } from "./schedule.entity";

export interface IEditScheduleDto {
  date: string;
  checkInTime: string;
  tolerance: number;
  observation?: string;
  mode: ScheduleModeEnum;
}
