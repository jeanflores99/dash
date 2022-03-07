import { ConditionContractType } from "./contract.entity";

export interface ICreateContractDto {
  workId: number;
  dependencyId: number;
  profileId: number;
  typeCategoryId: number;
  condition: ConditionContractType;
  ley?: string;
  plaza?: string;
  codeAIRHSP?: string;
  hourhandId: number;
  resolution: string;
  dateOfResolution: string;
  dateOfAdmission: string;
  terminationDate?: string;
  observation?: string;
  hours: number;
  file?: File | undefined;
}
