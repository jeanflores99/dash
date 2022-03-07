import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { AfpEntity } from "./dtos/afp.entity";

const request = scaleRequest();

export const getAfps = async ({
  page,
}: PaginateDto): Promise<ResponsePaginateDto<AfpEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  return await request
    .get(`afps`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
