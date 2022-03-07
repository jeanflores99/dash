import { ICreateTypeDescuentoDto } from './dtos/create-type_descuento.dto';
import { planillaRequest } from '@services/planilla.request'
import { PaginateDto } from '@services/dtos'
import { TypeDescuento } from './dtos/type_descuento.enitity'

const request = planillaRequest()

export const getTypeDescuentos = async ({ page, limit, querySearch }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set('page', `${page}`)
  params.set('querySearch', querySearch || '')
  params.set('limit', `${limit || 30}`)
  return await request.get(`typeDiscounts`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }))

}
export const findTypeDescuento = async (id: number): Promise<TypeDescuento> => {
  return await request.get(`typeDiscounts/${id}`)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}
export const createTypeDescuento = async (payload: ICreateTypeDescuentoDto): Promise<TypeDescuento> => {
  return await request.post(`typeDiscounts`, payload)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}