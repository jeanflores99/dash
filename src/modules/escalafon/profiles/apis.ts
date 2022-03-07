import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { IProfileEntity } from "./dtos/profile.entity";

const request = scaleRequest();

export const getProfiles = async ({
  page,
}: PaginateDto): Promise<ResponsePaginateDto<IProfileEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  return await request
    .get(`profiles`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
