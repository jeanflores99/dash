import { PaginateDto } from "@services/dtos";

export interface FilterGetLicensesDto extends PaginateDto {
  year?: number;
}
