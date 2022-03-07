import { ConditionContractType } from "./contract.entity";

export interface IEditContractDto {
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
  terminationDate?: string | null;
  observation?: string;
  hours: number;
}
