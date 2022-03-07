import { TypeDescuento } from '@modules/planilla/type_descuento/dtos/type_descuento.enitity'

export interface TypeSindicato {
  id: number,
  nombre?: string,
  monto?: string,
  porcentaje?: string,
  type_descuento_id?: boolean,
  is_porcentaje?: boolean,
  estado?: boolean,
  type_descuento?: TypeDescuento
}