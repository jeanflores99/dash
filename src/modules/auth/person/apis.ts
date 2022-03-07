import { PaginateDto } from "@services/dtos";
import { AuthRequest } from "@services/auth.request";
import { PersonEntity } from "./dtos/person.entity";
import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { ICreatePerson } from "./dtos/create-person.dto";
import { IEditPerson } from "./dtos/edit-person.dto";

const { request } = AuthRequest();

export const getPeople = async ({
  page,
  limit,
  querySearch,
}: PaginateDto): Promise<ResponsePaginateDto<PersonEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("limit", `${limit || 30}`);
  params.set("querySearch", querySearch || "");
  return await request
    .get(`people`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};

export const createPerson = async (payload: ICreatePerson) => {
  return await request.post(`people`, payload).then((res) => res.data);
};

export const findPerson = async (id: number) => {
  return await request.get(`people/${id}`).then((res) => res.data);
};

export const editPerson = async (id: number, payload: IEditPerson) => {
  return await request.put(`people/${id}`, payload).then((res) => res.data);
};
