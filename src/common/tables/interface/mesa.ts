import { IMesaDetails } from './mesaDetails'
export interface IMesa {
  id?: number,
  img?: string,
  name?: string,
  note?: string,
  discription?: string,
  discountPrice: number,
  status?: string,
  price: number
  stock?: string,
  review?: string,
  category?: string,
  consumo: IMesaDetails[]
}