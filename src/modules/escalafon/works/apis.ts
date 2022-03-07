import { scaleRequest } from "@services/scale.request";
import { PaginateDto } from "@services/dtos";
import { WorkEntity } from "./dtos/work.entity";
import { ICreateWorkDto } from "./dtos/create-work.dto";
import { IContractEntity } from "../contracts/dtos/contract.entity";

const request = scaleRequest();

export const getWorks = async ({ page, querySearch, limit }: PaginateDto) => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("querySearch", querySearch || "");
  params.set("limit", `${limit || 30}`);
  return await request
    .get(`works`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};

export const findWork = async (id: number): Promise<WorkEntity> => {
  return await request
    .get(`works/${id}`)
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};

export const createWork = async (
  payload: ICreateWorkDto
): Promise<WorkEntity> => {
  return await request.post(`works`, payload).then((res) => res.data);
};

export const editWork = async (
  id: number,
  payload: ICreateWorkDto
): Promise<WorkEntity> => {
  return await request.put(`works/${id}`, payload).then((res) => res.data);
};

export const getWorkToContracts = async (
  id: number,
  { page, querySearch, limit }: PaginateDto
) => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("querySearch", querySearch || "");
  params.set("limit", `${limit || 30}`);
  return await request
    .get(`works/${id}/contracts`, { params })
    .then((res) => res.data);
};

export const findLastContract = async (
  id: number
): Promise<IContractEntity> => {
  return await request
    .get(`works/${id}/contracts?page=1&limit=1`)
    .then((res: any) => {
      const items: IContractEntity[] = res.data?.items || [];
      return items[0];
    });
};
