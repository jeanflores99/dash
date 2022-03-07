import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { AuthRequest } from "@services/auth.request";
import { IDependencyEntity } from "./dtos/dependency.entity";

const { request } = AuthRequest();

export const getDependencies = async ({
  page,
}: PaginateDto): Promise<ResponsePaginateDto<IDependencyEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  return await request
    .get(`dependencies`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
