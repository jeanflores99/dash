import { MetaDto } from "@services/dtos"


export type ResponsePaginateDto<T> = {
  items: T[]
  meta: MetaDto
}