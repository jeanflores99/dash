import { planillaRequest } from '@services/planilla.request';
import { PaginateDto } from '@services/dtos';
import { TypeSindicato } from './dtos/type_sindicato.entity';
import { ICreateTypeSindicatonDto } from './dtos/create-type_sindicato.dto';

const request = planillaRequest();

export const getTypeSindicatos = async ({ page, querySearch, limit }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set('page', `${page}`);
  params.set('querySearch', querySearch || '')
  params.set('limit', `${limit || 30}`)
  return await request.get(`typeAffiliations`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
}

export const findTypeSindicato = async (id: number): Promise<TypeSindicato> => {
  return await request.get(`typeAffiliations/${id}`)
    .then(res => res.data)
    .catch(() => ({ err: true }))
}

export const createTypeSindicato = async (payload: ICreateTypeSindicatonDto): Promise<TypeSindicato> => await request.post(`typeAffiliations`, payload)
//   return await request.post(`type_sindicatos`, payload)
//     .then(res => res.data)
// }