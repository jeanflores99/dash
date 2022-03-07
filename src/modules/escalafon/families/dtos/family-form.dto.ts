import { PersonEntity } from "@modules/auth/person/dtos/person.entity";

export interface IFamilyFormDto {
  workId: number;
  personId: number;
  mode: any;
  person?: PersonEntity;
}
