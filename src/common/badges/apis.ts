import { PaginateDto } from "@services/dtos";
import { AuthRequest } from "@services/auth.request";
import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { IBadgeEntity } from "./dtos/badge.entity";

const { request } = AuthRequest();

export const getBadges = async ({
  page,
  limit,
  querySearch,
}: PaginateDto): Promise<ResponsePaginateDto<IBadgeEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  params.set("limit", `${limit || 30}`);
  params.set("querySearch", querySearch || "");
  return await request
    .get(`badges`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
