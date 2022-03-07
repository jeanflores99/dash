import { PersonEntity } from "@modules/auth/person/dtos/person.entity";

export interface IFamilyEntity {
  workId: number;
  personId: number;
  mode: any;
  person?: PersonEntity;
}
