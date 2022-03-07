import { AuthRequest } from "@services/auth.request";
import { IClientEntity } from "./dtos/client.entity";

const { request } = AuthRequest();

export const authorize = async (code: string): Promise<IClientEntity> => {
  return await request.get(`clients/${code}/authorize`).then((res) => res.data);
};
