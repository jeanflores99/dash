import { IBusinessEntity } from "@modules/auth/businesses/dtos/business.entity";

export interface IClientEntity {
  id: number;
  businessId: number;
  state: boolean;
  business?: IBusinessEntity;
}
