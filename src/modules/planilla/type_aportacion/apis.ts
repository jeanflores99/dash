import { ICreateTypeDescuentoDto } from './dtos/create-type_aportacion.dto';
import { planillaRequest } from '@services/planilla.request'
import { PaginateDto } from '@services/dtos'
import { TypeAportacion } from './dtos/type_aportacion.enitity'

const request = planillaRequest()

export const getTypeAportaciones = async ({ page, limit, querySearch }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set('page', `${page}`)
  params.set('querySearch', querySearch || '')
  params.set('limit', `${limit || 30}`)
  return await request.get(`typeAportations`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }))

}
export const findTypeAportacion = async (id: number): Promise<TypeAportacion> => {
  return await request.get(`typeAportations/${id}`)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}
export const createTypeAportacion = async (payload: ICreateTypeDescuentoDto): Promise<TypeAportacion> => {
  return await request.post(`typeAportations`, payload)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}