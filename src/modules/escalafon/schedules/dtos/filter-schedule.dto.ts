import { PaginateDto } from "@services/dtos";

export interface FilterGetSchedulesDto extends PaginateDto {
  year?: number;
  month?: number;
}
