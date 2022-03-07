export interface ICreateLicenseDto {
  contractId: number;
  typeLicenseId: number;
  resolution: string;
  dateOfResolution: string;
  dateOfAdmission: string;
  terminationDate: string;
  daysUsed: number;
  description: string;
  isPay: boolean;
}
