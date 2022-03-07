import { ResponsePaginateDto } from "@common/dtos/response-paginate.dto";
import { PaginateDto } from "@services/dtos";
import { AuthRequest } from "@services/auth.request";
import { ICampusEntity } from "../campuses/dtos/campus.entity";

const { request } = AuthRequest();

export const findCampuses = async (
  id: number,
  { page }: PaginateDto
): Promise<ResponsePaginateDto<ICampusEntity>> => {
  const params = new URLSearchParams();
  params.set("page", `${page || 1}`);
  params.set("limit", "100");
  return await request
    .get(`businesses/${id}/campuses`, { params })
    .then((res) => res.data)
    .catch(() => ({ err: true }));
};
