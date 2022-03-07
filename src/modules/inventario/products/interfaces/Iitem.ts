export enum UnidadMedida {
  'Kg', 'Und', 'Paquete', 'Litro'
}

export interface Iitem {
  id?: number,
  nombre?: string,
  priceunitario?: string,
  pricetotal?: string,
  unidadmedida?: UnidadMedida,
  tiempocaducidad?: string,
  count?: number,
  state?: boolean
}