export enum TypeProduct {
  'Bebida', 'Comida', 'Extras'
}
export interface Iproduct {
  id: number,
  name?: string,
  count?: string,
  precio?: string,
  typeProduc?: TypeProduct
}