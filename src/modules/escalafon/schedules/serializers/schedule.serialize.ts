import { DateTime } from "luxon";

import { ScheduleModeEnum } from "../dtos/schedule.entity";

export class ScheduleSerialize {
  private checkInTime!: string;
  private mode!: ScheduleModeEnum;

  get displayCheckInTime() {
    let format = DateTime.fromFormat(this.checkInTime, "HH:mm:ss");
    if (!format.isValid) {
      format = DateTime.fromFormat(this.checkInTime, "HH:mm");
    }
    // response
    return format.toFormat("HH:mm");
  }

  get displayFormatter() {
    // response
    return `${this.displayCheckInTime} ${
      this.mode == ScheduleModeEnum.ENTRY ? "Entrada" : "Salida"
    }`;
  }

  get displayBackground() {
    return this.mode == ScheduleModeEnum.ENTRY ? "bg-primary" : "bg-danger";
  }
}
