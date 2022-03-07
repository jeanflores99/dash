import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { scaleRequest } from "@services/scale.request";
import { ITypeCargoEntity } from "./dtos/type-cargo.entity";

const request = scaleRequest();

export const getTypeCargos = async ({
  page,
}: PaginateDto): Promise<ResponsePaginateDto<ITypeCargoEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page}`);
  return await request
    .get(`typeCargos`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
