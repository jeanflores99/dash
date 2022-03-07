import { ICreateAfpDto } from './dtos/create-afp.dtos';
import { planillaRequest } from '@services/planilla.request'
import { PaginateDto } from '@services/dtos'
import { Afp } from './dtos/afp.entity'

const request = planillaRequest()

export const getAfp = async ({ page, limit, querySearch }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set('page', `${page}`)
  params.set('querySearch', querySearch || '')
  params.set('limit', `${limit || 30}`)
  return await request.get(`afp`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }))

}
export const findAfp = async (id: number): Promise<Afp> => {
  return await request.get(`afp/${id}`)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}
export const createAfp = async (payload: ICreateAfpDto): Promise<Afp> => {
  return await request.post(`afp`, payload)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}