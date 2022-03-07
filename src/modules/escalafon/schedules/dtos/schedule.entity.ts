/* eslint-disable no-unused-vars */
export enum ScheduleModeEnum {
  ENTRY = "ENTRY",
  EXIT = "EXIT",
}

export interface IScheduleEntity {
  id: number;
  contractId: number;
  index: number;
  date: string;
  checkInTime: string;
  tolerance: number;
  observation?: string;
  mode: ScheduleModeEnum;
  description: string;
  state: boolean;
  entry?: IScheduleEntity;
  exit?: IScheduleEntity;
}
