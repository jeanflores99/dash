import { ITypeCargoEntity } from "@modules/escalafon/type-cargos/dtos/type-cargo.entity";

export interface ITypeCategoryEntity {
  id: number;
  name: string;
  description: string;
  state: boolean;
  typeCargo?: ITypeCargoEntity;
}
