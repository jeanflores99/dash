import { DateTime } from "luxon";

export class PersonSerialize {
  public dateOfBirth!: string;

  get displayDateOfBirth() {
    return DateTime.fromSQL(this.dateOfBirth).toFormat("dd/MM/yyyy");
  }
}
