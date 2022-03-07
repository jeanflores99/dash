import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { ITypeCategoryEntity } from "./dtos/type-category.entity";

const request = scaleRequest();

export const getTypeCategories = async ({
  page,
  limit,
  querySearch,
}: PaginateDto): Promise<ResponsePaginateDto<ITypeCategoryEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("limit", `${limit || 30}`);
  params.set("querySearch", querySearch || "");
  return await request
    .get(`typeCategories`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
