import { Iproduct } from './../interfaces/IProduct'
import { TypeProduct } from './../interfaces/ITypeProduc'

export const Products: Iproduct[] = [
  {
    id: 1,
    name: '1/8 Pollo',
    count: '12',
    precio: '8.00',
    state: true,
    typeProduc: TypeProduct.Comida,
  },
  {
    id: 2,
    name: '1/4 Pollo',
    count: '7',
    precio: '14.00',
    state: true,

    typeProduc: TypeProduct.Comida,
  },
  {
    id: 3,
    name: '1/2 Pollo',
    count: '5',
    state: true,
    precio: '26.00',
    typeProduc: TypeProduct.Comida
  }, {
    id: 4,
    name: '1 Pollo',
    count: '4',
    state: true,
    precio: '30.00',
    typeProduc: TypeProduct.Comida,
  }
  , {
    id: 5,
    name: 'Agua 450 ml',
    state: true,
    count: '20',
    precio: '3.00',
    typeProduc: TypeProduct.Bebida,
  }, {
    id: 6,
    name: 'Jarra 1 Lt',
    count: '17',
    state: true,
    precio: '8.00',
    typeProduc: TypeProduct.Bebida,
  }, {
    id: 7,
    name: 'Vaso Cebada',
    count: '40',
    state: true,
    precio: '2.00',
    typeProduc: TypeProduct.Bebida,
  }, {
    id: 8,
    name: 'Pollo Broster',
    count: '20',
    state: true,
    precio: '7.00',
    typeProduc: TypeProduct.Extras,
  },
  {
    id: 9,
    name: 'Salchipapa',
    state: true,
    count: '18',
    precio: '5.00',
    typeProduc: TypeProduct.Extras,
  }
]