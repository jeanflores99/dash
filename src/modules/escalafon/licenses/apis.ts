import { scaleRequest } from "@services/scale.request";
import { ICreateLicenseDto } from "./dtos/create-license.dto";
import { IEditLicenseDto } from "./dtos/edit-license.dto";
import { FilterGetLicensesDto } from "./dtos/filter-license.dto";
import { ILicenseEntity } from "./dtos/license.entity";

const request = scaleRequest();

export const getLicensesToContract = async (
  id: number,
  { page, querySearch, limit, year }: FilterGetLicensesDto
) => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("querySearch", querySearch || "");
  params.set("limit", `${limit || 30}`);
  if (year) params.set("year", `${year}`);
  // response
  return await request
    .get(`contracts/${id}/licenses`, { params })
    .then((res) => res.data);
};

export const createLicense = async (
  payload: ICreateLicenseDto
): Promise<ILicenseEntity> => {
  return await request.post(`licenses`, payload).then((res) => res.data);
};

export const editLicense = async (
  id: number,
  payload: IEditLicenseDto
): Promise<ILicenseEntity> => {
  return await request.put(`licenses/${id}`, payload).then((res) => res.data);
};
