import { scaleRequest } from "@services/scale.request";
import { IContractEntity } from "./dtos/contract.entity";
import { ICreateContractDto } from "./dtos/create-contract.dto";
import { IEditContractDto } from "./dtos/edit-contract.dto";

const request = scaleRequest();

export const createContract = async (
  payload: ICreateContractDto
): Promise<IContractEntity> => {
  const form = new FormData();
  const data: any = Object.assign({}, payload);
  Object.keys(data).forEach((key: any) => {
    if (!data[key]) return;
    form.append(key, data[key]);
  });
  // send request
  return await request
    .post(`contracts`, form, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data);
};

export const findContract = async (id: number) => {
  return await request.get(`contracts/${id}`).then((res) => res.data);
};

export const editContract = async (
  id: number,
  payload: IEditContractDto
): Promise<IContractEntity> => {
  // send request
  payload.terminationDate = payload.terminationDate || null;
  return await request.put(`contracts/${id}`, payload).then((res) => res.data);
};

export const findContractFile = async (id: number): Promise<any> => {
  return await request.get(`contracts/${id}/file`).then((res) => res.data);
};
