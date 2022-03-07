import { IDependencyEntity } from "@modules/auth/dependencies/dtos/dependency.entity";
import { IHourhandEntity } from "@modules/escalafon/hourhands/dtos/hourhand.entity";
import { IProfileEntity } from "@modules/escalafon/profiles/dtos/profile.entity";
import { ITypeCategoryEntity } from "@modules/escalafon/type-categories/dtos/type-category.entity";

export type ConditionContractType = "CONTRATADO" | "NOMBRADO";

export interface IContractEntity {
  id: number;
  workId: number;
  dependencyId: number;
  profileId: number;
  typeCategoryId: number;
  condition: ConditionContractType;
  ley?: string;
  plaza?: string;
  codeAIRHSP?: string;
  hourhandId: number;
  code: string;
  resolution: string;
  dateOfResolution: string;
  dateOfAdmission: string;
  terminationDate: string;
  observation?: string;
  hours: number;
  fileId?: number;
  state: boolean;
  typeCategory?: ITypeCategoryEntity;
  dependency?: IDependencyEntity;
  profile?: IProfileEntity;
  hourhand?: IHourhandEntity;
  file?: any;
}
