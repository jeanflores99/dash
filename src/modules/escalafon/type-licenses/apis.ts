import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { ITypeLicenseEntity } from "./dtos/type-license.entity";

const request = scaleRequest();

export const getTypeLicenses = async ({
  page,
  limit,
  querySearch,
}: PaginateDto): Promise<ResponsePaginateDto<ITypeLicenseEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("limit", `${limit || 30}`);
  params.set("querySearch", querySearch || "");
  return await request
    .get(`typeLicenses`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
