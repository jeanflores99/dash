import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { IFamilyCreateDto } from "./dtos/family-create.dto";
import { IFamilyEntity } from "./dtos/family.entity.dto";

const request = scaleRequest();

export const getFamiliesByWork = async (
  id: number,
  { page, querySearch, limit }: PaginateDto
) => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("querySearch", querySearch || "");
  params.set("limit", `${limit || 30}`);
  return await request
    .get(`works/${id}/families`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};

export const createFamily = async (
  payload: IFamilyCreateDto
): Promise<IFamilyEntity> => {
  return await request.post(`families`, payload).then((res) => res.data);
};

export const editWork = async (
  id: number,
  payload: IFamilyCreateDto
): Promise<IFamilyEntity> => {
  return await request.put(`works/${id}`, payload).then((res) => res.data);
};
