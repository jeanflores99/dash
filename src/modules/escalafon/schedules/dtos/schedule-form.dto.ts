import { ScheduleModeEnum } from "./schedule.entity";

export interface IScheduleFormDto {
  date: string;
  checkInTime: string;
  tolerance: number;
  observation?: string;
  mode: ScheduleModeEnum;
}
