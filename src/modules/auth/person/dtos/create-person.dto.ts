import { PersonMaritalStatus } from "./person.entity";

export interface ICreatePerson {
  prefix: string;
  name: string;
  lastname: string;
  secondaryName?: string;
  documentTypeId: string;
  documentNumber: string;
  badgeId: string;
  dateOfBirth: string;
  gender: "F" | "M";
  maritalStatus: PersonMaritalStatus;
  phone?: string;
  emailContact?: string;
  address?: string;
}
