import { PersonEntity } from "@modules/auth/person/dtos/person.entity";
import { AfpEntity } from "@modules/escalafon/afps/dtos/afp.entity";

export interface WorkEntity {
  id: number;
  personId: number;
  afpId: number;
  affiliationOfDate?: string;
  numberOfCussp?: string;
  isPrimaSeguro: boolean;
  numberOfEssalud?: string;
  dateOfAdmission: string;
  orderBy: string;
  state: boolean;
  person?: PersonEntity;
  afp?: AfpEntity;
}
