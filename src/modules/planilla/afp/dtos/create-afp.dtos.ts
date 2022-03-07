export interface ICreateAfpDto {
  afp_id?: number,
  afp?: string,
  type_afp_id?: number,
  type_afp?: string,
  type_descuento_id?: boolean,
  porcentaje?: string,
  aporte_descuento_id?: boolean,
  aporte?: string,
  prima_descuento_id?: boolean,
  prima?: string,
  prima_limite?: string,
  private?: boolean,
  estado?: boolean,
  descripcion?: string

}