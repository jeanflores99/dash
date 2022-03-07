import { planillaRequest } from '@services/planilla.request';
import { PaginateDto } from '@services/dtos';
import { TypeRemuneration } from './dtos/type_remuneration.entity';
import { ICreateTypeRemunerationDto } from './dtos/create-type_remunerations.dto';

const request = planillaRequest();

export const getTypeRemunerations = async ({ page, querySearch, limit }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set('page', `${page}`);
  params.set('querySearch', querySearch || '')
  params.set('limit', `${limit || 30}`)
  return await request.get(`typeRemunerations`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
}

export const findTypeRemuneration = async (id: number): Promise<TypeRemuneration> => {
  return await request.post(`typeRemunerations/${id}`)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}

export const createTypeRemuneration = async (payload: ICreateTypeRemunerationDto)
  : Promise<TypeRemuneration> => {
  return await request.post(`typeRemunerations`, payload)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}

export const updateTypeRemuneration = async (id: number, payload: TypeRemuneration)
  : Promise<TypeRemuneration> => {
  return await request.put(`typeRemunerations/${id}`, payload)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}