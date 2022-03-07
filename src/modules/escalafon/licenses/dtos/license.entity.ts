import { IContractEntity } from "@modules/escalafon/contracts/dtos/contract.entity";
import { ITypeLicenseEntity } from "@modules/escalafon/type-licenses/dtos/type-license.entity";

export interface ILicenseEntity {
  id: number;
  contractId: number;
  typeLicenseId: number;
  resolution: string;
  dateOfResolution: string;
  dateOfAdmission: string;
  terminationDate: string;
  daysUsed: number;
  description: string;
  isPay: boolean;
  state: boolean;
  contract?: IContractEntity;
  typeLicense?: ITypeLicenseEntity;
}
