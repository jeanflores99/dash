import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { IHourhandEntity } from "./dtos/hourhand.entity";

const request = scaleRequest();

export const getHourhands = async ({
  page,
}: PaginateDto): Promise<ResponsePaginateDto<IHourhandEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  return await request
    .get(`hourhands`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
