
export interface PaginateDto {
  page: number;
  limit?: number;
  querySearch?: string;
}

export interface MetaDto {
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
}

export interface InputDto {
  name: string
  value: any
}