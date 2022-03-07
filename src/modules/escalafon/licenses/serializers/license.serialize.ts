import { DateTime } from "luxon";

export class LicenseSerialize {
  private dateOfResolution!: string;
  private dateOfAdmission!: string;
  private terminationDate!: string;
  private daysUsed!: number;
  private isPay!: boolean;

  get displayDateOfResolution() {
    return DateTime.fromSQL(`${this.dateOfResolution}`).toFormat(`dd/MM/yyyy`);
  }

  get displayDateOfAdmission() {
    return DateTime.fromSQL(`${this.dateOfAdmission}`).toFormat(`dd/MM/yyyy`);
  }

  get displayTerminationDate() {
    return DateTime.fromSQL(`${this.terminationDate}`).toFormat(`dd/MM/yyyy`);
  }

  get displayDaysUsed() {
    return `${this.daysUsed} ${this.daysUsed <= 1 ? "Día" : "Días"}`;
  }

  get displayIsPay() {
    return this.isPay ? "Si" : "No";
  }
}
