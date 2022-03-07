import { ICreateTypeCategoriaDto } from './dtos/create-type_categoria.dto';
import { planillaRequest } from '@services/planilla.request'
import { PaginateDto } from '@services/dtos'
import { TypeCategoria } from './dtos/type_categoria.entity'

const request = planillaRequest()

export const getTypeCategorias = async ({ page, limit, querySearch }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set('page', `${page}`)
  params.set('querySearch', querySearch || '')
  params.set('limit', `${limit || 30}`)
  return await request.get(`type_categorias`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }))

}
export const findTypeCategoria = async (id: number): Promise<TypeCategoria> => {
  return await request.get(`type_categorias/${id}`)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}
export const createTypeCategoria = async (payload: ICreateTypeCategoriaDto): Promise<TypeCategoria> => {
  return await request.post(`type_categorias`, payload)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}